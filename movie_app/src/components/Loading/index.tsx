
import ReactLoading from 'react-loading';
import './index.scss';

export default function Loading() {
    return (
        <div className='loading-container'>
            <ReactLoading type='spin' color='#6046ff' height={'5%'} width={'5%'} />
        </div>
    );
}