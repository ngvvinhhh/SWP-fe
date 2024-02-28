// import React from 'react';
// import { Collapse, Table } from 'antd';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Chart } from '../../component/chart';


// const text = `
//   Service
// `;



// const Service = () => {

//     const dataSource = [
//         {
//           key: '1',
//           picture: 'Mike',
//           service: 32,
//           action: '10 Downing Street',
//         },
//         {
//           key: '2',
//           picture: 'John',
//           service: 42,
//           action: '10 Downing Street',
//         },
//       ];
      
//       const columns = [
//         {
//           title: 'Picture',
//           dataIndex: 'picture',
//           key: 'picture',
//         },
//         {
//           title: 'Service',
//           dataIndex: 'service',
//           key: 'service',
//         },
//         {
//           title: 'Action',
//           dataIndex: 'action',
//           key: 'action',
//         },
//       ];

//     return <div>
//         <Table dataSource={dataSource} columns={columns} />
  
//     </div>
// }
// const items = [
//   {
//     key: '1',
//     label: 'Package 1', 
//     children:     <Service/>,
//   },
//   {
//     key: '2',
//     label: 'Package 2',
//     children: <Service/>,
//   },
//   {
//     key: '3',
//     label: 'Package 3',
//     children: <Service/>,
//   },
// ];
// const Package = () => {
//   const onChange = (key) => {
//     console.log(key);
//   };
//   return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
// };


// export default Package;


import React, { useState } from 'react';
import { Collapse, Table, Button, Space, Modal, Form, Input } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';

const { Panel } = Collapse;

const ActionButtons = ({ onEdit, onDelete }) => (
  <Space>
    <Button type="primary" onClick={onEdit}>
      Edit
    </Button>
    <Button type="danger" onClick={onDelete}>
      Delete
    </Button>
  </Space>
);

const Service = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = () => {
    // Logic to edit the action
    console.log('Edit button clicked');
    setModalVisible(true);
  };

  const handleDelete = () => {
    // Logic to delete the action
    console.log('Delete button clicked');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalOk = () => {
    // Logic to handle modal OK button click (save changes)
    console.log('Modal OK button clicked');
    setModalVisible(false);
  };

  const dataSource = [
    {
      key: '1',
      service: 'Sườn',
      discription:'sườn nướng',
      picture: 'acb',
      action: '10 Downing Street',
    },
    {
      key: '2',
      service: 'Bì',
      discription:'Bì luộc',
      picture: 'bcd',
      action: '10 Downing Street',
    },
    {
      key: '3',
      service: 'Chả',
      discription:'Chả chiên',
      picture: 'bcd',
      action: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Discription',
      dataIndex: 'discription',
      key: 'discription',
    },
    {
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <ActionButtons
            onEdit={() => handleEdit(record.key)}
            onDelete={() => handleDelete(record.key)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Edit Action"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {/* Form fields for editing action details */}
        <Form>
          <Form.Item label="Action Name">
            <Input />
          </Form.Item>
          {/* Add more form fields as needed */}
        </Form>
      </Modal>
    </div>
  );
};

const Package = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdd = () => {
    // Logic to add a new package
    console.log('Add button clicked');
    setModalVisible(true);
  };

  const handleEditPackage = () => {
    // Logic to edit the selected package
    console.log('Edit Package button clicked');
  };

  const handleDeletePackage = () => {
    // Logic to delete the selected package
    console.log('Delete Package button clicked');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalOk = () => {
    // Logic to handle modal OK button click (save changes)
    console.log('Modal OK button clicked');
    setModalVisible(false);
  };

  const handleChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Package 1',
      children: <Service />,
    },
    {
      key: '2',
      label: 'Package 2',
      children: <Service />,
    },
    {
      key: '3',
      label: 'Package 3',
      children: <Service />,
    },
  ];

  return (
    <div>
      <Space>
        <Button type="primary" onClick={handleAdd}>
          Add
        </Button>
        <Button type="primary" onClick={handleEditPackage}>
          Edit
        </Button>
        <Button type="danger" onClick={handleDeletePackage}>
          Delete
        </Button>
      </Space>

      <Collapse items={items} defaultActiveKey={['1']} onChange={handleChange} />

      <Modal
        title="Edit Package"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {/* Form fields for editing package details */}
        <Form>
          <Form.Item label="Package Name">
            <Input />
          </Form.Item>
          {/* Add more form fields as needed */}
        </Form>
      </Modal>
    </div>
  );
};

export default Package;