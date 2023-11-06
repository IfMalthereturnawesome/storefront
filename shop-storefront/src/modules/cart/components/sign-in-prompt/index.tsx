import Link from 'next/link';
import SecondaryButton from '@modules/common/components/button/SecondaryButton';

const SignInPrompt = () => {
    return (

        <div className="flex flex-col  mb-5 xs:flex-row xs:items-start xs:justify-between xs:mb-6 lg:mb-8">
            <div className="text-left ">
                <h2 className="text-xl-semi text-slate-12">Already have an account?</h2>
                <p className="text-base-regular text-slate-11 mt-2 sm:mt-3">
                    Sign in for a better experience.
                </p>
            </div>
            <div className="w-full xs:w-auto mt-4 xs:mt-0 xs:ml-4 flex justify-start">
                <Link href="/account/login">

                    <SecondaryButton variant="secondary"
                                     className="!min-h-[0] h-[46px] w-full sm:w-auto custom-button-neo__dark-black rounded-none">
                        Sign in
                    </SecondaryButton>
                </Link>
            </div>
        </div>
    );
};

export default SignInPrompt;
