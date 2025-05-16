import { Color } from "chroma-js"
import If from "@components/common/if"
import cx, { Class } from "@utils/cx"
import { resolveSceneState } from "@utils/resolve-scene-state"
import { BGState } from "."

interface Props {
  state: BGState
  className: Class
  foreground: Color[]
  background: Color[]
}

export default function Snapper({ state, className, background }: Props) {
  return (
    <div
      className={cx(
        className,
        "grid grid-cols-1 grid-rows-1 items-center justify-center",
      )}
    >
      {/* Background */}
      <div className="col-span-full row-span-full grid h-full w-full grid-cols-6 grid-rows-6 gap-1 p-4 *:border *:border-black/10">
        <If
          condition={state.pattern === "square"}
          renderItem={() => (
            <>
              <div
                style={{
                  background: resolveSceneState(state, background)
                    ?.at(0)
                    ?.css(),
                }}
                className="col-span-full row-span-full rounded-2xl"
              />
              {/* Shadow */}
              {/* <div
                style={{
                  background: resolveSceneState(state, background)
                    ?.at(0)
                    ?.css(),
                }}
                className="col-span-full row-span-full rounded-2xl blur-md"
              /> */}
            </>
          )}
        />

        <If
          condition={["horizontal-strip", "vertical-strip"].includes(
            state.pattern,
          )}
          renderItem={() => {
            const colors = resolveSceneState(state, background)

            return (
              <>
                <div
                  style={{ background: colors?.at(0)?.css() }}
                  className={cx("z-10 rounded-2xl", {
                    "col-span-full row-span-3 row-start-1":
                      state.pattern === "horizontal-strip",
                    "col-span-3 col-start-1 row-span-full":
                      state.pattern === "vertical-strip",
                  })}
                />
                <div
                  style={{ background: colors?.at(1)?.css() }}
                  className={cx("z-10 rounded-2xl", {
                    "col-span-full row-span-3 row-start-4":
                      state.pattern === "horizontal-strip",
                    "col-span-3 col-start-4 row-span-full":
                      state.pattern === "vertical-strip",
                  })}
                />

                {/* Shadow */}
                {/* <div
                  style={{ background: colors?.at(0)?.css() }}
                  className={cx("rounded-2xl blur-md", {
                    "col-span-full row-span-3 row-start-1":
                      state.pattern === "horizontal-strip",
                    "col-span-3 col-start-1 row-span-full":
                      state.pattern === "vertical-strip",
                  })}
                />
                <div
                  style={{ background: colors?.at(1)?.css() }}
                  className={cx("rounded-2xl blur-md", {
                    "col-span-full row-span-3 row-start-4":
                      state.pattern === "horizontal-strip",
                    "col-span-3 col-start-4 row-span-full":
                      state.pattern === "vertical-strip",
                  })}
                /> */}
              </>
            )
          }}
        />
      </div>

      {/* Foreground */}
      <div className="col-span-full row-span-full h-full w-full"></div>
    </div>
  )
}
