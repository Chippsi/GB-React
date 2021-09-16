import React from 'react'
import './NotFound.sass'
export default function notFound() {
    return (
        <div className='notFound'>
            <div className="notFound__container container">
                <div className="notFound__body">
                    <div className="notFound__code">404</div>
                    <div className="notFound__txt">Page is not found</div>
                </div>
            </div>
        </div>
    )
}
