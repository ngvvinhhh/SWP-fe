import React from 'react';
import { Collapse, Table } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { Chart } from '../../component/chart';


const text = `
  Service
`;



const Service = () => {

    const dataSource = [
        {
          key: '1',
          picture: 'Mike',
          service: 32,
          action: '10 Downing Street',
        },
        {
          key: '2',
          picture: 'John',
          service: 42,
          action: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Picture',
          dataIndex: 'picture',
          key: 'picture',
        },
        {
          title: 'Service',
          dataIndex: 'service',
          key: 'service',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
        },
      ];

    return <div>
        <Table dataSource={dataSource} columns={columns} />
  
    </div>
}
const items = [
  {
    key: '1',
    label: 'Package 1', 
    children:     <Service/>,
  },
  {
    key: '2',
    label: 'Package 2',
    children: <Service/>,
  },
  {
    key: '3',
    label: 'Package 3',
    children: <Service/>,
  },
];
const Package = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};


export default Package;
