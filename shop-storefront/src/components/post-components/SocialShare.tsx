'use client';

import {Tooltip} from "@nextui-org/react";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    EmailShareButton,
    EmailIcon,
    TwitterShareButton,


} from 'next-share';

interface SocialShareProps {
    url: string;
    title: string;
}

export default function SocialShare({
                                        url,
                                        title,
                                    }: SocialShareProps) {
    return (
        <aside className="flex justify-center pt-4 md:pt-0">
            <div className="flex flex-row items-center text-center md:items-center md:justify-between md:text-left">
                {/* Twitter */}
                <div className="px-1 text-lg text-gray-400">
                    <Tooltip
                        content="Share on Twitter"
                    >
                        <TwitterShareButton
                            url={'https://eightathletics.com/blog/' + url}
                            title={title}
                        >
                            {/* Twitter Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28"
                                 viewBox="0 0 50 50" className="rounded-full dark:fill-white">
                                <path
                                    d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                            </svg>
                        </TwitterShareButton>
                    </Tooltip>
                </div>
                {/* Linkedin */}
                <div className="px-1 text-lg text-gray-400">
                    <Tooltip
                        content="Share on Linkedin"
                    >
                        <LinkedinShareButton url={'https://eightathletics.com/blog/' + url}>
                            <LinkedinIcon size={28} round/>
                        </LinkedinShareButton>
                    </Tooltip>
                </div>
                {/* Facebook */}
                <div className="px-1 text-lg text-gray-400">
                    <Tooltip
                        content="Share on Facebook"

                    >
                        <FacebookShareButton
                            url={'https://eightathletics.com/blog/' + url}
                            quote={title}
                            hashtag={'#Eight Athletics'}
                        >
                            <FacebookIcon size={28} round/>
                        </FacebookShareButton>
                    </Tooltip>
                </div>

                {/* Facebook Messenger */}
                <div className="px-1 text-lg text-gray-400">
                    <Tooltip
                        content="Share on Messenger"

                    >
                        <FacebookMessengerShareButton
                            url={'https://eightathletics.com/blog/' + url}
                            appId={''}
                        >
                            <FacebookMessengerIcon size={28} round/>
                        </FacebookMessengerShareButton>
                    </Tooltip>
                </div>
                {/* WhatsApp */}
                <div className="px-1 text-lg text-gray-400">
                    <Tooltip
                        content="Share on WhatsApp"

                    >
                        <WhatsappShareButton
                            url={'https://eightathletics.com/blog/' + url}
                            title={title}
                            separator=":: "
                        >
                            <WhatsappIcon size={28} round/>
                        </WhatsappShareButton>
                    </Tooltip>
                </div>

                {/* Email */}
                <div className="px-1 text-lg text-gray-400">
                    <Tooltip
                        content="Share on Email"
                    >
                        <EmailShareButton
                            url={'\tHere is the link: ' + 'https://eightathletics.com/blog/' + url}
                            subject={'Check this post out from Eight Athletics'}
                            body={title}
                        >
                            <EmailIcon size={28} round/>
                        </EmailShareButton>
                    </Tooltip>
                </div>
            </div>
        </aside>
    );
}
