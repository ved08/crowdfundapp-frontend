
import { FC } from "react";
import { CrowdFund } from '../../components/CrowdFund';
import { ListOfFundRaisers } from '../../components/ListOfFundRaisers';



export const BasicsView: FC = ({ }) => {

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className="text-center">
          <CrowdFund />
          <br />
          <br />
          <p>(or)</p>
          <br />
          <br />
          <ListOfFundRaisers />
        </div>
      </div>
      <p className="Credits">Project created by <a rel="noreferrer" href="https://github.com/ved08">Vedvardhan Gyanmote</a></p>
    </div>
  );
};
