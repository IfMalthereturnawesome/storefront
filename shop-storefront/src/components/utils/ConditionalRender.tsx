
import { headers } from 'next/headers';

export const ConditionalRender = ({ children, showOn }) => {
    const headersList = headers();
    const userAgent = headersList.get('user-agent');

    const isMobile = Boolean(userAgent.match(
        /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|Windows Phone/i
    ));

    const isTablet = Boolean(userAgent.match(
        /iPad|PlayBook|Kindle/i
    ));

    let deviceType = 'desktop';

    if (isMobile) {
        deviceType = 'mobile';
    } else if (isTablet) {
        deviceType = 'tablet';
    }

    const shouldRender = showOn.includes(deviceType);

    return shouldRender ? children : null;
};
