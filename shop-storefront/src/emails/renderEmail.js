import WelcomeEmail from './welcome.js';

import { render } from "@react-email/render";

export function getWelcomeEmailHtml(fullName) {
  return render(<WelcomeEmail fullName={fullName} />);
}