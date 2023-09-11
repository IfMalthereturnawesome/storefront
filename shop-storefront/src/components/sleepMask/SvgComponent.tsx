import * as React from "react"
import { SVGProps, Ref, forwardRef } from "react"
const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        id="test"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox="0 0 1920 1080"
        ref={ref}
    >
        <g id="test-u-lever" transform="translate(-245.17 220.969)">
            <g id="test-s-g1" transform="translate(-11 9)">
                <path
                    id="test-u-lever2"
                    fill="none"
                    stroke="#3f5787"
                    strokeWidth={3}
                    d="m-431.873 2.39 863.746-4.78"
                    transform="translate(1090.478 349.203)"
                />
                <path
                    id="test-u-lever3"
                    fill="none"
                    stroke="#3f5787"
                    strokeWidth={3}
                    d="m-431.873 2.39 863.746-4.78"
                    transform="translate(1090.478 329.203)"
                />
                <path
                    id="test-s-path1"
                    fill="none"
                    stroke="#3f5787"
                    strokeWidth={3.84}
                    d="M658.606 351.594v-20"
                />
            </g>
            <path
                id="test-s-path2"
                fill="none"
                stroke="#3f5787"
                strokeWidth={3.84}
                d="m1523.692 346.813-.828-20"
                transform="translate(-10 9)"
            />
        </g>
        <path
            id="test-s-path3"
            fill="none"
            stroke="#3f5787"
            strokeWidth={3.84}
            d="M841.275 600.797q100.398-122.71 101.946-122.714l58.064 74.75q-260.409 170.673-160.01 47.964Z"
            transform="matrix(-.61153 .6998 -.57231 -.50012 1707.797 333.61)"
        />
        <text
            id="test-u-minimal-weight"
            fill="#e7ecef"
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"test:::Inter"'
            fontSize={100}
            fontWeight={700}
            transform="rotate(6.377 1793.645 2447.061)"
        >
            <tspan id="test-s-tspan1" y={0} strokeWidth={0} fontWeight={700}>Minimal</tspan>
            <tspan
                id="test-s-tspan2"
                x={0}
                y={100}
                strokeWidth={0}
                fontWeight={700}
            >
                weight
            </tspan>
        </text>
        <text
            id="test-u-maximum"
            fill="#e7ecef"
            strokeWidth={0}
            dx={0}
            dy={0}
            fontFamily='"test:::Inter"'
            fontSize={100}
            fontWeight={700}
            transform="translate(873.833 -134.823)"
        >
            <tspan id="test-s-tspan3" y={0} strokeWidth={0} fontWeight={700} >
                Maximum
            </tspan>
            <tspan
                id="test-s-tspan4"
                x={0}
                y={100}
                strokeWidth={0}
                fontWeight={700}
            >
                comfort
            </tspan>
        </text>
        <script />
        <style >
            {
                '@font-face{font-family:"test:::Inter";font-style:normal;font-weight:700;src:url(data:font/ttf;charset=utf-8;base64,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)format("truetype")}'
            }
        </style>
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export default ForwardRef
