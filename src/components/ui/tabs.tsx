"use client";

import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";

const TabExample = () => (
  <Tabs.Root className="w-full" defaultValue="tab1">
    <Tabs.List className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
      <Tabs.Trigger value="tab1" className="px-4 py-2 text-sm font-medium text-center text-gray-600 bg-white shadow rounded-lg focus:outline-none">
        Tab 1
      </Tabs.Trigger>
      <Tabs.Trigger value="tab2" className="px-4 py-2 text-sm font-medium text-center text-gray-600 hover:bg-white hover:shadow rounded-lg focus:outline-none">
        Tab 2
      </Tabs.Trigger>
      <Tabs.Trigger value="tab3" className="px-4 py-2 text-sm font-medium text-center text-gray-600 hover:bg-white hover:shadow rounded-lg focus:outline-none">
        Tab 3
      </Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="tab1" className="p-4">
      <p>Content for Tab 1</p>
    </Tabs.Content>

    <Tabs.Content value="tab2" className="p-4">
      <p>Content for Tab 2</p>
    </Tabs.Content>

    <Tabs.Content value="tab3" className="p-4">
      <p>Content for Tab 3</p>
    </Tabs.Content>
  </Tabs.Root>
);

export default TabExample;