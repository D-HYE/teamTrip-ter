export interface TabItem {
  link: string;
  src: string;
  title: string;
  desc: string;
}

export interface TabData {
  tabid: string;
  tabnm: string;
  tablist: TabItem[];
}

export interface Answer {
  label: string;
  value: string | number;
  src: string;
}

export interface QuestionItem {
  question: string;
  answers: Answer[];
  className: string;
}


export interface FeelterQuestion {
  question: string;
  answers: Answer[];
  className: string;
}

export type MyFeelterQ = FeelterQuestion[];

export interface AllData {
  myfeelterQ: MyFeelterQ;
  mainTabMenu: TabData[];
}
