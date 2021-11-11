import IntlMessages from "../../../../util/IntlMessages";
import {Button, Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import Image from "../../../../components/uploadImage";
import {getGender} from "../../../../util/ParseUtils";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteMember} from "../../../../appRedux/actions";

const DeleteModal = (props) => {
    const dispatch = useDispatch();
    const {items} = useSelector(({getList}) => getList);
    const {hasShowModal, selectIndex} = useSelector(({common}) => common);

    const onSubmit = () => {
        dispatch(deleteMember(items[selectIndex]._id, items[selectIndex].type, props.param));
    }

    return (
        <Modal
            title={<IntlMessages id="admin.user.form.student.title"/>}
            visible={hasShowModal && props.action === "delete"}
            footer={
                <>
                    <Button onClick={props.showModal}>{<IntlMessages id="admin.user.form.cancel"/>}</Button>
                    <Button type="primary" form="add-edit-form" htmlType="submit">{<IntlMessages id="admin.user.form.delete"/>}</Button>
                </>
            }
            onCancel={props.showModal}
            bodyStyle={{overflowY: "scroll", height: "600px"}}
            centered
            width={600}>
            <Form
                onFinish={onSubmit}
                id="add-edit-form"
                initialValues={props.getInitValueModal()}>
                <Row justify="center">
                    <Col span={12}>
                        <Image url={props.urlAvatar} disabled={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.name"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="name">
                            <Input placeholder="Nguyen Van A" disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={<IntlMessages id="admin.user.student.table.gender"/>}
                                   name="gender"
                                   labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                            <Select disabled={true}>
                                <Select.Option value="male">{getGender("male")}</Select.Option>
                                <Select.Option value="female">{getGender("female")}</Select.Option>
                                <Select.Option value="other">{getGender("other")}</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.phoneNumber"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="phone_number">
                            <Input placeholder="0987654321" disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.dob"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="dob">
                            <DatePicker style={{width: "100%"}} format={'DD/MM/YYYY'} disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.email"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="email">
                            <Input placeholder="nguyenvan@gmail.com" disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={<IntlMessages id="admin.user.student.table.address"/>}
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            name="address">
                            <Input.TextArea rows={4} disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default DeleteModal;
