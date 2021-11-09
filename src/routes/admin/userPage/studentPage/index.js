import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select, Table} from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {useDispatch, useSelector} from "react-redux";
import {getListMember} from "../../../../appRedux/actions";
import {getDate, getGender} from "../../../../util/ParseUtils";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

const {RangePicker} = DatePicker;
let param = {
    page: 1,
    size: 10,
    sort: {
        is_asc: true,
        field: "_id"
    },
    types: ["student"],
    keyword: "",
    genders: []
}

const StudentPage = () => {
    const dispatch = useDispatch();
    const {loaderTable, items, totalItems} = useSelector(({getList}) => getList);
    const {locale} = useSelector(({settings}) => settings);
    const [showModal, setShowModal] = useState(false);
    const [style, setStyle] = useState("150px");

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

    function onShow() {
        console.log(showModal);
        setShowModal(!showModal);
    }

    return (
        <Card title={<h2><IntlMessages id="admin.user.student.title"/></h2>}
              extra={<Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" style={{float: "right"}}
                             onClick={onShow}/>}>
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
                               title: <IntlMessages id="admin.user.student.table.index"/>,
                               dataIndex: "index",
                               render: (text, record, index) => index + 1,
                               width: '10%',
                           },
                           {
                               key: "_id",
                               title: <IntlMessages id="admin.user.student.table.id"/>,
                               dataIndex: "_id",
                               width: "25%",
                               sorter: true
                           },
                           {
                               key: "name",
                               title: <IntlMessages id="admin.user.student.table.name"/>,
                               dataIndex: "name",
                               width: "20%",
                               sorter: true
                           },
                           {
                               key: "gender",
                               title: <IntlMessages id="admin.user.student.table.gender"/>,
                               dataIndex: "gender",
                               render: (gender) => getGender(gender),
                               width: "10%",
                               sorter: true,
                           },
                           {
                               key: "email",
                               title: <IntlMessages id="admin.user.student.table.email"/>,
                               dataIndex: "email",
                               width: "20%",
                               sorter: true
                           },
                           {
                               key: "create_date",
                               title: <IntlMessages id="admin.user.student.table.createdDate"/>,
                               dataIndex: "create_date",
                               render: (create_date) => getDate(create_date),
                               width: "15%",
                               sorter: true
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
                title="Thông tin loại khóa học"
                visible={showModal}
                footer={
                    <Button type="primary" form={"normal_login"} >Lưu</Button>
                }
                onCancel={onShow}
            >
                <Form>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label={"Tên loại khóa học"}
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                name="category_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên loại khóa học!',
                                    },
                                ]}
                            >
                                <Input placeholder="Toeic"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Trạng thái"
                                       name="status"
                                       labelCol={{span: 24}}
                                       wrapperCol={{span: 24}}
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Vui lòng nhập tên loại khóa học!',
                                           },
                                       ]}>
                                <Select>
                                    <Select.Option value="ACTIVE">Hoạt động</Select.Option>
                                    <Select.Option value="INACTIVE">Không hoạt động</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={24}>
                            <Form.Item
                                label={"Mô tả"}
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                name="description">
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
