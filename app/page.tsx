"use client";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import Editor from "../components/editor/Editor";

import { EditorContext, ImageUploadContext } from "@/lib/context";
import { elementsReducer } from "@/lib/editorReducer";
import SideBar from "@/components/sidebar/SideBar";
import { loadFont } from "./utils/LoadFont";
import EditorProvider from "@/components/provider/EditorProvider";

function WebBuilder() {


  return (
    <div className="flex justify-between">
      <EditorProvider>
        <Editor />
        <SideBar />
      </EditorProvider>
    </div>
  );
}

export default WebBuilder;
