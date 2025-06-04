import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';

import SubLayout from '../../layout/sub/SubLayout';

import TripRoute from './tripRoute/TripRoute';
import TripTalk from './tripTalk/TripTalk';
import TripterEvent from './tripEvent/TripterEvent';
import List from './bbs/List';
import Service from './service/Service';
import ProductList from './product/ProductList';

import { MyFeelterQ } from '../../types/common';

type SubContentsProps = {
  id: string;
  myfilter?: MyFeelterQ; // optional로 받도록 지정
};

const SubContents: React.FC<SubContentsProps> = ({ id, myfilter }) => {
    const { tab = "" } = useParams<{ tab?: string }>();

    const tabToTransIdMap: Record<string, string> = {
      findFriend: "tripTalk",
      findPlan: "tripTalk",
      ask: "service",
    };
    
    const transId = tabToTransIdMap[tab] ?? id;

    const ComponentMap: Record<string, JSX.Element> = {
      tripRoute: tab === "myFeelter" 
      ? <TripRoute tab={tab} myfeelter={myfilter} />
      : <TripRoute tab={tab} />,
      tripTalk: <TripTalk />,
      service: <Service />,
      bbs: <List />,
      event: <TripterEvent />,
      products: <ProductList tab={tab} />
    };
    
    useEffect(() => {
      console.log(`SubContents mounted with id: ${id}`);
    }, [id]);
  
    return (
      <SubLayout id={transId} tab={tab}>
        <section id={id}>
          { ComponentMap[id] ?? <TripRoute tab={tab}/> }
        </section>
      </SubLayout>
    );
  };

export default SubContents;
