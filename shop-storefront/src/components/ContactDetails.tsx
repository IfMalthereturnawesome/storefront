import React from 'react';

const ContactDetails = () => {
    return (
        <div
            className="bg-cyan-2 border-2 border-b-0 border-amberA-12 shadow-md max-w-fit rounded-t-lg p-6 mx-auto px-4 sm:px-6 relative text-center">
            <div
                className="inline-block relative p-8 m-0 font-light leading-7 w-full align-baseline border-0 md:flex-1 md:self-end text-slate-11">
                <div className="p-0 m-0 text-left  border-0 ">
                    <h4 className="p-0 my-2 mx-0 text-xl text-slate-12  align-baseline border-0"
                        style={{lineHeight: '1.42'}}>
                        Contact Details
                    </h4>
                    <h3 className="p-0 my-2 mb-8 mx-0 text-2xl text-slate-12  font-medium align-baseline border-0"
                        style={{lineHeight: '1.42'}}>
                        Eight Athletics
                    </h3>

                </div>
                <div className="p-0 pb-4 m-0 text-left leading-7 align-baseline border-0 ">
                    <h5 className="p-0 my-2 mx-0 text-md font-bold align-baseline border-0"
                        style={{lineHeight: '1.56'}}>
                        Phone / Email
                    </h5>
                    <p className="p-0 m-0 text-left align-baseline border-0" style={{lineHeight: '1.56'}}>
                        <a href="tel:+4528906798" className="hover:text-indigo-500 ">
                            (+45) 2890 6798
                        </a>
                        <br/>
                        <a href="mailto:info@eightathletics.com" className="hover:text-indigo-500 ">
                            info@eightathletics.com
                        </a>
                    </p>
                </div>
                <div className="p-0 m-0 pb-4 text-left leading-7 align-baseline border-0">
                    <h5 className="p-0 my-2 mx-0 text-md font-bold align-baseline border-0"
                        style={{lineHeight: '1.56'}}>
                        Office Hours
                    </h5>
                    <p className="p-0 m-0 text-base align-baseline border-0" style={{lineHeight: '1.56'}}>
                        Monday-Friday: 08:00-20:00 GMT+2 <br/>
                        Weekends: 10:00-14:00 GMT+2 <br/>
                        Holidays: Vary
                    </p>
                </div>
                <div className="p-0 m-0 pb-4 leading-7 text-left align-baseline border-0">
                    <h5 className="p-0 my-2 mx-0 text-md font-bold align-baseline border-0"
                        style={{lineHeight: '1.56'}}>
                        Response Time
                    </h5>
                    <p className="p-0 m-0 text-base align-baseline border-0" style={{lineHeight: '1.56'}}>
                        Within 24 hours. <br/>
                    </p>
                </div>
                <div className="p-0 m-0 leading-7 text-left align-baseline border-0">
                    <h5 className="p-0 my-2 mx-0 text-md font-bold align-baseline border-0"
                        style={{lineHeight: '1.56'}}>
                        Company Information
                    </h5>
                    <p className="p-0 m-0  align-baseline border-0" style={{lineHeight: '1.56'}}>
                        Eight Athletics ApS
                    </p>
                    <p className="p-0 m-0  align-baseline border-0" style={{lineHeight: '1.56'}}>
                        DK-43737899
                    </p>
                    <p className="px-0 pt-0  m-0  font-medium align-baseline border-0 md:font-light"
                       style={{lineHeight: '1.56'}}>
                        Sofiegade 5,<br/>
                        Copenhagen K 1418, <br/>
                        Zealand, Denmark
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
