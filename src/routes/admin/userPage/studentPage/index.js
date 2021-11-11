import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Dropdown, Form, Input, Menu, Modal, Row, Select, Table} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {addMember, getListMember, onHideModal, onShowModal} from "../../../../appRedux/actions";
import {getDate, getGender} from "../../../../util/ParseUtils";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Image from "../../../../components/uploadImage";
import moment from 'moment';

moment.updateLocale('vi', {
    weekdaysMin: ["Cn", "T2", "T3", "T4", "T5", "T6", "T7"],
    monthsShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
});

const {RangePicker} = DatePicker;
let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: false,
        field: "_id"
    },
    types: ["student"],
    keyword: "",
    genders: []
}

const options = [
    'Edit',
    'Delete',
];

const StudentPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {locale} = useSelector(({settings}) => settings);
    const {hasShowModal} = useSelector(({common}) => common);
    const [style, setStyle] = useState("150px");
    const [image, setImage] = useState(null);

    function onChange(pagination, filters, sorter) {
        if (sorter != null && sorter.columnKey != null && sorter.order != null) {
            param = {
                ...param,
                sort: {
                    is_asc: sorter.order === "ascend",
                    field: sorter.columnKey
                }
            }
        }
        param = {
            ...param,
            page: pagination.current,
            size: pagination.pageSize
        }
        dispatch(getListMember(param));
    }

    function onSearch(e) {
        param = {
            ...param,
            keyword: e.target.value,
            page: 1
        }
        dispatch(getListMember(param));
    }

    useEffect(() => {
        if (items.length === 0) {
            dispatch(getListMember(param));
        }
    }, []);

    function showTotalItems(total) {
        return <span><IntlMessages id="table.total.items"/>: {total}</span>;
    }

    function onFilterGender(e) {
        const genders = Array.isArray(e) ? e.map((x) => x) : []
        param = {
            ...param,
            genders: genders,
            page: 1
        }
        dispatch(getListMember(param));
    }

    function onFilterDate(dates) {
        if (dates !== null && dates[0] != null && dates[1] != null) {
            setStyle("370px");
            param = {
                ...param,
                from_date: dates[0].unix() * 1000,
                to_date: dates[1].unix() * 1000,
                page: 1
            }
            dispatch(getListMember(param));
        }
    }

    function onChangeDatePicker(dates) {
        if (dates === null || dates.length === 0) {
            setStyle("150px");
            param = {
                ...param,
                from_date: null,
                to_date: null,
                page: 1
            }
            dispatch(getListMember(param));
        }
    }

    function onSubmit(member) {
        member = {
            ...member,
            dob: member.dob.unix() * 1000,
            type: "student",
            avatar: image
        }
        dispatch(addMember(member));
    }

    const menus = () => (<Menu onClick={(e) => {
        if (e.key === 'Edit') {
            console.log("edit");
        } else {
            console.log("delete");
        }
    }}>
        {options.map(option =>
            <Menu.Item key={option}>
                {option}
            </Menu.Item>,
        )}
    </Menu>);

    function showModal() {
        if (hasShowModal) {
            dispatch(onHideModal());
        } else {
            dispatch(onShowModal());
        }
    }

    return (
        <Card title={<h2><IntlMessages id="admin.user.student.title"/></h2>}
              extra={<Button type="primary"
                             shape="circle"
                             icon={<PlusOutlined/>}
                             size="large"
                             style={{float: "right"}}
                             onClick={showModal}/>}
              className="gx-card">
            <Form layout="inline" style={{marginBottom: "10px", marginTop: "10px"}}>
                <Form.Item label={<IntlMessages id="admin.user.student.table.gender"/>}
                           name="genders"
                           style={{marginLeft: "10px", marginRight: "10px"}}>
                    <IntlMessages id="filter.select">
                        {placeholder =>
                            <Select mode="multiple"
                                    style={{minWidth: "100px"}}
                                    onChange={onFilterGender}
                                    placeholder={placeholder}>
                                <Select.Option key="male" value="male">{getGender("male")}</Select.Option>
                                <Select.Option key="female" value="female">{getGender("female")}</Select.Option>
                                <Select.Option key="other" value="other">{getGender("other")}</Select.Option>
                            </Select>
                        }
                    </IntlMessages>
                </Form.Item>
                <Form.Item label={<IntlMessages id="admin.user.student.table.createdDate"/>}
                           name="createdDate">
                    <RangePicker showTime style={{width: style}}
                                 onOk={onFilterDate}
                                 onChange={onChangeDatePicker}
                                 placeholder={locale.locale === "vi" ? ["Từ", "Đến"] : ["From", "To"]}
                    />
                </Form.Item>
            </Form>
            <IntlMessages id="table.search">
                {placeholder => <Input
                    placeholder={placeholder}
                    prefix={<SearchOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    onPressEnter={onSearch}
                />}
            </IntlMessages>
            <Table dataSource={items}
                   columns={
                       [
                           {
                               key: "index",
                               dataIndex: "index",
                               render: (text, record, index) => index + 1,
                               width: 50,
                           },
                           {
                               key: "_id",
                               title: <IntlMessages id="admin.user.student.table.id"/>,
                               dataIndex: "_id",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "name",
                               title: <IntlMessages id="admin.user.student.table.name"/>,
                               dataIndex: "name",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "gender",
                               title: <IntlMessages id="admin.user.student.table.gender"/>,
                               dataIndex: "gender",
                               render: (gender) => getGender(gender),
                               width: 100,
                               sorter: true,
                           },
                           {
                               key: "email",
                               title: <IntlMessages id="admin.user.student.table.email"/>,
                               dataIndex: "email",
                               width: 250,
                               sorter: true
                           },
                           {
                               key: "create_date",
                               title: <IntlMessages id="admin.user.student.table.createdDate"/>,
                               dataIndex: "create_date",
                               render: (create_date) => getDate(create_date),
                               width: 150,
                               sorter: true
                           },
                           {
                               key: "action",
                               dataIndex: "_id",
                               render: (_id) => (<div>
                                   <Dropdown overlay={menus} placement="bottomRight" trigger={['click']}>
                                       <i className="gx-icon-btn icon icon-ellipse-v"/>
                                   </Dropdown>
                               </div>),
                               fixed: 'right',
                               width: 60,
                           },
                       ]
                   }
                   loading={loaderTable}
                   onChange={onChange}
                   scroll={{y: 520}} pagination={
                {
                    size: "small",
                    total: totalItems,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: showTotalItems,
                    defaultPageSize: 10,
                    pageSizeOptions: ["10", "15", "20"]
                }
            }/>
            <Modal
                title={<IntlMessages id="admin.user.form.student.title"/>}
                visible={hasShowModal}
                footer={
                    <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages
                        id="admin.user.form.save"/>}</Button>
                }
                onCancel={showModal}
            >
                <Form
                    onFinish={onSubmit}
                    id="add-edit-form"
                    initialValues={{
                        gender: "male",
                        address: ""
                    }}>
                    <Row justify="center">
                        <Col span={12}>
                            <Image setImage={setImage}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label={<IntlMessages id="admin.user.student.table.name"/>}
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: <IntlMessages id="admin.user.form.name"/>,
                                    },
                                ]}
                            >
                                <Input placeholder="Nguyen Van A"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<IntlMessages id="admin.user.student.table.gender"/>}
                                       name="gender"
                                       labelCol={{span: 24}}
                                       wrapperCol={{span: 24}}
                                       rules={[
                                           {
                                               required: true,
                                               message: <IntlMessages id="admin.user.form.gender"/>,
                                           },
                                       ]}>
                                <Select>
                                    <Select.Option value="male">{getGender("male")}</Select.Option>
                                    <Select.Option value="female">{getGender("female")}</Select.Option>
                                    <Select.Option value="other">{getGender("other")}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<IntlMessages id="admin.user.student.table.phoneNumber"/>}
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                name="phone_number"
                                rules={[
                                    {
                                        required: true,
                                        message: <IntlMessages id="admin.user.form.phoneNumber"/>,
                                    },
                                ]}
                            >
                                <Input placeholder="0987654321"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<IntlMessages id="admin.user.student.table.dob"/>}
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                name="dob"
                                rules={[
                                    {
                                        required: true,
                                        message: <IntlMessages id="admin.user.form.dob"/>,
                                    },
                                ]}>
                                <DatePicker style={{width: "100%"}}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label={<IntlMessages id="admin.user.student.table.email"/>}
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: <IntlMessages id="admin.user.form.email"/>,
                                        type: "email"
                                    },
                                ]}
                            >
                                <Input placeholder="nguyenvan@gmail.com"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label={<IntlMessages id="admin.user.student.table.address"/>}
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                name="address">
                                <Input.TextArea rows={4}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Card>
    );
};

export default StudentPage;
