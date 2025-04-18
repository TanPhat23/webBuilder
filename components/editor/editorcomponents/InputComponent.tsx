import {
  commonProps,
  EditorComponentProps,
  InputElement,
} from "@/lib/interface";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

type Props = EditorComponentProps & {
  commonProps?: Partial<commonProps>;
};

const InputComponent = ({
  element,
  commonProps,

}: Props) => {
  const inputProps: HTMLMotionProps<"input"> = {
    ...((element as InputElement).inputSettings as HTMLMotionProps<"input">),
  };

  return (
    <motion.div {...commonProps} className="relative group">
      <motion.input {...inputProps}></motion.input>
    </motion.div>
  );
};

export default InputComponent;
