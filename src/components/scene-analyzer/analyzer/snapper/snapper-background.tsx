import { Color } from "chroma-js"
import If from "@components/common/if"
import cx, { Class } from "@utils/cx"
import { BGPattern, BGState } from ".."
import { resolveSceneState } from "./resolve-snapper-state"

interface Props {
  state: BGState
  background: Color[]
  className: Class
}

export default function SnapperBackground({
  state,
  background,
  className,
}: Props) {
  return (
    <div
      className={cx(
        className,
        "grid grid-cols-6 grid-rows-6 gap-1 p-4 *:border *:border-black/10",
      )}
    >
      <If
        condition={state.pattern === ("square" as BGPattern)}
        renderItem={() => (
          <div
            style={{
              background: resolveSceneState(state, background)?.at(0)?.css(),
            }}
            className="col-span-full row-span-full rounded-2xl"
          />
        )}
      />

      <If
        condition={(
          ["horizontal-strip-double", "vertical-strip-double"] as BGPattern[]
        ).includes(state.pattern)}
        renderItem={() => {
          const colors = resolveSceneState(state, background)

          return (
            <>
              <div
                style={{ background: colors?.at(0)?.css() }}
                className={cx("z-10 rounded-2xl", {
                  "col-span-full row-span-3 row-start-1":
                    state.pattern === "horizontal-strip-double",
                  "col-span-3 col-start-1 row-span-full":
                    state.pattern === "vertical-strip-double",
                })}
              />
              <div
                style={{ background: colors?.at(1)?.css() }}
                className={cx("z-10 rounded-2xl", {
                  "col-span-full row-span-3 row-start-4":
                    state.pattern === "horizontal-strip-double",
                  "col-span-3 col-start-4 row-span-full":
                    state.pattern === "vertical-strip-double",
                })}
              />
            </>
          )
        }}
      />

      <If
        condition={(
          [
            "t",
            "t-reverse",
            "horizontal-strip-triple",
            "vertical-strip-triple",
          ] as BGPattern[]
        ).includes(state.pattern)}
        renderItem={() => {
          const colors = resolveSceneState(state, background)

          return (
            <>
              <div
                style={{ background: colors?.at(0)?.css() }}
                className={cx("z-10 rounded-2xl", {
                  "col-span-full row-span-3 row-start-1": state.pattern === "t",
                  "col-span-3 row-span-3": state.pattern === "t-reverse",
                  "col-span-full row-span-2":
                    state.pattern === "horizontal-strip-triple",
                  "col-span-2 row-span-full":
                    state.pattern === "vertical-strip-triple",
                })}
              />
              <div
                style={{ background: colors?.at(1)?.css() }}
                className={cx("z-10 rounded-2xl", {
                  "col-span-3 row-span-3":
                    state.pattern === "t" || state.pattern === "t-reverse",
                  "col-span-full row-span-2":
                    state.pattern === "horizontal-strip-triple",
                  "col-span-2 row-span-full":
                    state.pattern === "vertical-strip-triple",
                })}
              />
              <div
                style={{ background: colors?.at(2)?.css() }}
                className={cx("z-10 rounded-2xl", {
                  "col-span-3 row-span-3": state.pattern === "t",
                  "col-span-full row-span-3": state.pattern === "t-reverse",
                  "col-span-full row-span-2":
                    state.pattern === "horizontal-strip-triple",
                  "col-span-2 row-span-full":
                    state.pattern === "vertical-strip-triple",
                })}
              />
            </>
          )
        }}
      />
    </div>
  )
}
