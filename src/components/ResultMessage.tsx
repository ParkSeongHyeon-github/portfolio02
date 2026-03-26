import type { ResultProps } from '../type/result/result-type';
import { Link } from 'react-router-dom';
import "../css/ResultMessage.css";

type Props = ResultProps & {
    title : string,
    onClose?: () => void;
    link : string | null
};

const ResultMessage = ({title, type, message, onClose, link} : Props) => {
    return(
        <div id="result-wrap">
            <div>
                <div className="header">{type === "success" ? `${title} 성공!` : `${title} 실패`}</div>
                <p>{message}</p>
                {type === "success" && <Link to={`${link}`} className="check-btn" onClick={onClose}>확인</Link>}
                {type === "error" &&  <button className="check-btn" onClick={onClose}>확인</button>}
            </div>
        </div>
    )
}

export default ResultMessage;