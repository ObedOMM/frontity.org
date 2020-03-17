import React from "react";
import { css, styled } from "frontity";
import { Processor } from "@frontity/html2react/types";
import FrontityOrg from "../../types";

const Dot = styled.span`
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-left: 7px;
  background-color: rgba(255, 255, 255, 0.15);
`;

const Top = () => (
  <div
    css={css`
      height: 26px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    `}
  >
    <Dot />
    <Dot />
    <Dot />
  </div>
);

const backgroundColor: Processor<React.HTMLProps<HTMLElement>, FrontityOrg> = {
  name: "backgroundColor",
  test: ({ node }) =>
    node.type === "element" &&
    (node.props?.className?.split(" ").includes("terminal") ||
      node.props?.className?.split(" ").includes("has-code")),

  processor: ({ node, state }) => {
    if (node.type !== "element") {
      return node;
    }

    node.props.css = css`
      ${node.props.css}
      background-color: red;
      font-family: monospace;
      background: ${state.theme.colors.voidblu};
      height: 310px;
      width: 400px;
      box-shadow: 0 2px 12px 0 rgba(12, 17, 43, 0.4),
        0 1px 4px 0 rgba(12, 17, 43, 0.39);
      border-radius: 8px;

      .wp-block-group__inner-container {
        margin-top: 12px;
      }

      ol {
        list-style: none;
        counter-reset: counter;
      }

      li {
        counter-increment: counter;
        margin-left: 18px;
        line-height: 1.3;
      }

      ol li::before {
        content: counter(counter) " ";
        color: rgba(255, 255, 255, 0.15);
        margin-right: 2px;
      }
    `;

    const top: any = {
      type: "element",
      component: Top,
      props: { color: state.theme.colors.wall }
    };

    node.children.unshift(top);

    return node;
  }
};

export default backgroundColor;
