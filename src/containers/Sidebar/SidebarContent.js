import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {useSelector} from "react-redux";

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
    const {navStyle, themeType} = useSelector(({settings}) => settings);
    const pathname = useSelector(({common}) => common.pathname);

    const getNoHeaderClass = (navStyle) => {
        if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
            return "gx-no-header-notifications";
        }
        return "";
    };

    return (
        <>
            <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
            <div className="gx-sidebar-content">
                <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
                    <UserProfile/>
                    <AppsNavigation/>
                </div>
                <CustomScrollbars className="gx-layout-sider-scrollbar">
                    <Menu
                        defaultOpenKeys={["/admin/dashboard"]}
                        selectedKeys={[pathname]}
                        theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
                        mode="inline">

                        <Menu.Item key="/admin/dashboard">
                            <Link to="/admin/dashboard"><i className="icon icon-widgets"/>
                                <span><IntlMessages id="sidebar.dashboard"/></span>
                            </Link>
                        </Menu.Item>
                        <Menu.SubMenu key="managerUser"
                                      title={
                                          <span><i className="icon icon-avatar"/>
                                              <span><IntlMessages id="sidebar.managerUser"/>
                                              </span></span>}>
                            <Menu.Item key="/admin/student">
                                <Link to="/admin/student">
                                    <span><IntlMessages id="sidebar.managerUser.student"/></span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/admin/teacher">
                                <Link to="/admin/teacher">
                                    <span><IntlMessages id="sidebar.managerUser.teacher"/></span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/admin/receptionist">
                                <Link to="/admin/receptionist">
                                    <span><IntlMessages id="sidebar.managerUser.receptionist"/></span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="managerStudy"
                                      title={
                                          <span><i className="icon icon-ckeditor"/>
                                <span><IntlMessages id="sidebar.managerStudy"/></span></span>}>
                            <Menu.Item key="/admin/course-category">
                                <Link to="/admin/course-category">
                                    <span><IntlMessages id="sidebar.managerStudy.courseCategory"/></span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/admin/course">
                                <Link to="/admin/course">
                                    <span><IntlMessages id="sidebar.managerStudy.course"/></span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>

                    </Menu>
                </CustomScrollbars>
            </div>
        </>
    );
};

export default React.memo(SidebarContent);

