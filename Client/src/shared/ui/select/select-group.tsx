import type { ComponentPropsWithoutRef } from "react";

export type SelectGroupProps = ComponentPropsWithoutRef<"div">;

export const SelectGroup = (props: Readonly<SelectGroupProps>) => <div role="group" {...props} />;
