"use client";
import React from "react";
import { Provider } from "react-redux";
import { configStore } from "./store";
type TProviderProps = {
  children: React.ReactNode;
};
// provider redux
export default function ReduxProvider({ children }: TProviderProps) {
  return <Provider store={configStore}>{children}</Provider>;
}
