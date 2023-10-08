"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const ProviderAndStore = ({ children }:{
  children: React.ReactNode;
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderAndStore;
