const std = @import("std");
const math = std.math;

const Hexagon = struct {
    points: [6][2]u16, // 6 points (x,y)
};

const HexPyramid = struct {
    hexagons: []Hexagon,
    svgHeight: u16,
};

var gpa = std.heap.page_allocator;

export fn generateHexPyramid(svgWidth: u16, size: u8, gap: i8) *HexPyramid {
    const total_hexagons = @as(u16, size) * (@as(u16, size) + 1) / 2;

    const pyramid = gpa.create(HexPyramid) catch unreachable;
    pyramid.hexagons = gpa.alloc(Hexagon, total_hexagons) catch unreachable;

    const svgWidth_f: f32 = @floatFromInt(svgWidth);
    const size_f: f32 = @floatFromInt(size);
    const gap_f: f32 = @floatFromInt(gap);

    const side_length_f = (svgWidth_f - (size_f - 1.0) * gap_f) / (math.sqrt(3.0) * size_f);
    const hex_width_f = math.sqrt(3.0) * side_length_f; // horizontal span of one hexagon
    const hex_height_f = 2.0 * side_length_f;             // vertical span of one hexagon
    const vertical_spacing_f = 1.5 * side_length_f + gap_f;      // vertical distance between centers

    // Compute overall SVG height.
    const svg_height_f = (size_f - 1.0) * vertical_spacing_f + hex_height_f;
    pyramid.svgHeight = @as(u16, @intFromFloat(svg_height_f + 0.5));

    var hex_index: usize = 0;
    var row: u8 = 0;
    while (row < size) : (row += 1) {
        const row_f: f32 = @floatFromInt( row);
        const hex_count = row + 1;
        const hex_count_f: f32 = @floatFromInt( hex_count);

        const total_row_width = hex_count_f * hex_width_f + (hex_count_f - 1.0) * gap_f;

        const start_x = (svgWidth_f - total_row_width) / 2.0 + hex_width_f / 2.0;
        const base_y = row_f * vertical_spacing_f + hex_height_f / 2.0;

        var col: u8 = 0;
        while (col < hex_count) : (col += 1) {
            const center_x = start_x + @as(f32, @floatFromInt(col)) * (hex_width_f + gap_f);
            const center_y = base_y;

            const angles = [6]f32{ 0.0, 60.0, 120.0, 180.0, 240.0, 300.0 };
            inline for (angles, 0..) |angle, i| {
                const rad = math.degreesToRadians(angle + 30.0);
                const x = center_x + side_length_f * @cos(rad);
                const y = center_y + side_length_f * @sin(rad);


                pyramid.hexagons[hex_index].points[i][0] = @as(u16, @intFromFloat(x + 0.5));
                pyramid.hexagons[hex_index].points[i][1] = @as(u16, @intFromFloat(y + 0.5));
            }
            hex_index += 1;
        }
    }

    return pyramid;
}

export fn freeHexPyramid(pyramid: *HexPyramid) void {
    gpa.free(pyramid.hexagons);
    gpa.destroy(pyramid);
}
