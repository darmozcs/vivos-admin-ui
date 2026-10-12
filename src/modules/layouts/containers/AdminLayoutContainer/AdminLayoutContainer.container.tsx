import { AdminLayout } from "../../components";
import { useAdminLayout } from "../../hooks";

export const AdminLayoutContainer = () => {
  const {
    menuItems,
    navbarOpened,
    desktopNavbarVisible,
    toggleDesktopNavbar,
    toggleNavbar,
    closeNavbar,
    storeName,
    userName,
    userRole,
  } = useAdminLayout();

  return (
    <AdminLayout
      menuItems={menuItems}
      navbarOpened={navbarOpened}
      desktopNavbarVisible={desktopNavbarVisible}
      onToggleDesktopNavbar={toggleDesktopNavbar}
      onToggleNavbar={toggleNavbar}
      onCloseNavbar={closeNavbar}
      storeName={storeName}
      userName={userName}
      userRole={userRole}
    />
  );
};
