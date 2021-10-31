import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "../../util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "../../util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const {themeType, navStyle, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/dashboard')[1];
    return (<Auxiliary>

        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              <Menu.Item key="dashboard">
                <Link to="/dashboard"><i className="icon icon-widgets"/>
                  <IntlMessages id="sidebar.dashboard"/></Link>
              </Menu.Item>
              <Menu.SubMenu key="managerUser"
                            className={this.getNavStyleSubMenuClass(navStyle)}
                            title={
                              <span>
                                <i className="icon icon-avatar"/>
                                <IntlMessages id="sidebar.managerUser"/>
                              </span>}>
                <Menu.Item key="student">
                  <Link to="/student">
                    <IntlMessages id="sidebar.managerUser.student"/></Link>
                </Menu.Item>
                <Menu.Item key="teacher">
                  <Link to="/teacher">
                    <IntlMessages id="sidebar.managerUser.teacher"/></Link>
                </Menu.Item>
                <Menu.Item key="receptionist">
                  <Link to="/receptionist">
                    <IntlMessages id="sidebar.managerUser.receptionist"/></Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="managerStudy"
                            className={this.getNavStyleSubMenuClass(navStyle)}
                            title={
                              <span>
                                <i className="icon icon-ckeditor"/>
                                <IntlMessages id="sidebar.managerStudy"/>
                              </span>}>
                <Menu.Item key="courseCategory">
                  <Link to="/course-category">
                    <IntlMessages id="sidebar.managerStudy.courseCategory"/></Link>
                </Menu.Item>
                <Menu.Item key="course">
                  <Link to="/course">
                    <IntlMessages id="sidebar.managerStudy.course"/></Link>
                </Menu.Item>
              </Menu.SubMenu>

            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

