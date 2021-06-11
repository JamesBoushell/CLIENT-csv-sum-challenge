import React, { Fragment, useRef } from 'react';
import './UploadForm.css';

interface Props {
    fileType: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadForm = (props: Props) => {

    const fileInput = useRef<HTMLInputElement>(null);

    return (
        <Fragment>
            <input hidden type="file" className="btn btn-primary" ref={fileInput} accept={props.fileType} onChange={props.handleChange}/>
            <button className="btn btn-lg btn-primary" onClick={ () => fileInput.current?.click()}>Click Here to Upload CSV</button>
        </Fragment>
    )
}

export default UploadForm
