import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarGroup className="px-8 py-6 group-data-[collapsible=icon]:px-4 group-data-[collapsible=icon]:py-4">
      <SidebarGroupLabel>Admin</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={item.isActive}
              tooltip={item.title}
              className="hover:bg-primary-container hover:text-[var(--on-primary)] focus-visible:bg-primary-container focus-visible:text-[var(--on-primary)] data-[active=true]:bg-primary-container data-[active=true]:text-[var(--on-primary-container)]"
            >
              <a href={item.url}>
                {item.icon}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
