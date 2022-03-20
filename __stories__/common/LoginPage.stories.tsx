import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import LoginPage from "src/common/components/LoginPage";

export default {
  title: "Common/LoginPage",
  component: LoginPage,
} as Meta;

const Template: Story = () => <LoginPage />;

export const Default = Template.bind({});
Default.args = {};
