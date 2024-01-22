import React, {Fragment, useState,useEffect} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import ReviewsComponent from "@/components/sleepMask/ReviewsDisplay";
import {XMarkIcon} from "@heroicons/react/24/outline";


type Review = {
    id: number;
    rating: number;
    date: string;
    summary: string;
    color: string;

};

const mockReviews: Review[] = [
    { id: 1, rating: 5, date: '1.dec. 2023', summary: 'Absolute game-changer for my sleep!', color: 'Warm Grey'},
    { id: 2, rating: 5, date: '3.dec. 2023', summary: 'Very comfortable, blocks light effectively.', color: 'Warm Grey'},
    { id: 3, rating: 5, date: '6.dec. 2023', summary: 'Best sleep mask I have ever used!', color: 'Warm Grey'},
    { id: 4, rating: 4, date: '9.dec. 2023', summary: 'Good quality, feels great on the skin.', color: 'Space Grey'},
    { id: 5, rating: 5, date: '11.dec. 2023', summary: 'Enhanced my sleep quality significantly!', color: 'Space Grey'},
    { id: 6, rating: 4, date: '14.dec. 2023', summary: 'Really helps with blocking out the lights from my husbands TV.', color: 'Warm Grey'},
    { id: 7, rating: 5, date: '16.dec. 2023', summary: 'Total blackout, exactly what I needed!', color: 'Warm Grey'},
    { id: 8, rating: 4, date: '18.dec. 2023', summary: 'Great for side sleepers, no pressure on eyes.', color: 'Space Grey'},
    { id: 9, rating: 5, date: '21.dec. 2023', summary: 'Works like it should, no complaints.', color: 'Space Grey'},
    { id: 10, rating: 4, date: '21.dec. 2023', summary: 'Good quality so far', color: 'Space Grey'},
    { id: 11, rating: 5, date: '22.dec. 2023', summary: 'Comfortable and effective, a must-have!', color: 'Warm Grey'},
    { id: 12, rating: 5, date: '27.dec. 2023', summary: 'Slept through the night for the first time in ages!', color: 'Space Grey'},
    { id: 13, rating: 4, date: '28.dec. 2023', summary: 'Quality material, stays in place all night.', color: 'Warm Grey'},
    { id: 14, rating: 5, date: '30.dec. 2023', summary: 'Surprisingly comfortable, love the darkness it provides.', color: 'Space Grey'},
    { id: 15, rating: 4, date: '2.jan. 2024', summary: 'Effective light blocking, just a bit tight.', color: 'Warm Grey'},
    { id: 16, rating: 5, date: '3.jan. 2024', summary: 'Perfect for my night shifts, total darkness.', color: 'Space Grey'},
    { id: 17, rating: 5, date: '3.jan. 2024', summary: '', color: 'Space Grey'},
    { id: 18, rating: 4, date: '5.jan. 2024', summary: 'Good value for money, highly recommend.', color: 'Warm Grey'},
    { id: 19, rating: 5, date: '6.jan. 2024', summary: 'Luxuriously soft and completely blocks out light.', color: 'Space Grey'},
    { id: 20, rating: 4, date: '7.jan. 2024', summary: 'No more sleep interruptions, quite pleased.', color: 'Warm Grey'},
    { id: 21, rating: 5, date: '8.jan. 2024', summary: 'Finally, a sleep mask that fits my large head!', color: 'Space Grey'},
    { id: 22, rating: 4, date: '8.jan. 2024', summary: '', color: 'Space Grey'},
    { id: 23, rating: 5, date: '8.jan. 2024', summary: 'My wife seems to like it ', color: 'Warm Grey'},
    { id: 24, rating: 5, date: '9.jan. 2024', summary: 'Helps me during my midday naps', color: 'Warm Grey'},
    { id: 25, rating: 5, date: '10.jan. 2024', summary: 'Incredibly comfortable, and the fit is just right!', color: 'Space Grey'},
    { id: 26, rating: 4, date: '13.jan. 2024', summary: 'Blocks light well, but could be a bit softer.', color: 'Space Grey'},
    { id: 27, rating: 5, date: '15.jan. 2024', summary: 'A lifesaver for my overnight flights.', color: 'Warm Grey'},
    { id: 28, rating: 3, date: '16.jan. 2024', summary: 'Good, but leaves slight marks on the face in the morning, but they go away quickly.', color: 'Space Grey'},
    { id: 29, rating: 5, date: '18.jan. 2024', summary: 'The best sleep mask I’ve ever owned. Highly recommend!', color: 'Space Grey'},
    { id: 30, rating: 5, date: '20.jan. 2024', summary: 'I got these for my mom cause she really liked mine when she tried \'em. They got a strong strap, super comfy, and pretty much block out all the light. They\'re still good after washing. Best ones I\'ve ever got.', color: 'Warm Grey'},
    { id: 31, rating: 5, date: '22.jan. 2024', summary: 'Effective in blocking light, and stays comfortable the whole night.', color: 'Warm Grey'},

];

const sortedReviews = [...mockReviews].sort((a, b) => b.id - a.id);

const ReviewsSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const initialReviewsToShow = 5;
    const [visibleReviews, setVisibleReviews] = useState<Review[]>(sortedReviews.slice(0, initialReviewsToShow));


// Calculate the average rating based on all reviews
    const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;
    const reviewCount = mockReviews.length;



    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="w-full hover:text-slate-11">
                <ReviewsComponent rating={averageRating} reviewCount={mockReviews.length}/>

            </button>


            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsOpen(false)}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                        </Transition.Child>

                        {/* Centering container for the modal */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-x-full"
                            enterTo="opacity-100 translate-x-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-x-0"
                            leaveTo="opacity-0 translate-x-full"
                        >
                            <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl  md:fixed md:top-0 md:right-0 md:h-full md:w-1/4">
                                <div className="absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <Dialog.Title as="h3" className="text-2xl  flex justify-center font-semibold mx-4 mb-2 mt-4 leading-6 text-gray-900">
                                    Reviews
                                </Dialog.Title>
                                <div className="px-4 pt-2 pb-4 flex  flex-col text-center justify-center">
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center justify-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`h-6 w-6 ${i < averageRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 6.516l2.12-4.296 2.121 4.296 4.709.686-3.404 3.323.804 4.695-4.21-2.223-4.21 2.223.805-4.695-3.404-3.323 4.709-.686z" />
                                                </svg>
                                            ))}
                                        </div>

                                    </div>
                                    <span className="ml-2 text-sm font-semibold text-center text-gray-600">
      {averageRating.toFixed(1)} based on {reviewCount} reviews
    </span>
                                </div>
                                <div className="p-4 overflow-y-auto h-[80vh] bg-custom-white">
                                    {/* Map through reviews and render them */}
                                    {visibleReviews.map((review) => (
                                        <div key={review.id} className="mb-4 border-b border-gray-200 pb-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center space-x-1">
                                                    {/* Render star ratings here */}
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M9.049 2.927c.12-.374.394-.374.514 0l1.89 5.82h6.127c.41 0 .58.252.294.487l-4.942 3.593 1.889 5.819c.12.374-.096.688-.515.688a.726.726 0 0 1-.296-.068L10 15.41l-4.92 3.856a.726.726 0 0 1-.296.068c-.419 0-.635-.314-.515-.688l1.89-5.819-4.942-3.593c-.286-.235-.116-.487.294-.487h6.127l1.89-5.82z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-600">{review.date}</p>
                                            </div>
                                            <p className="text-sm text-gray-800 font-poppins">{review.summary}</p>
                                            <div className="mt-2 text-xs text-gray-500">
                                                <span>Color: {review.color} </span>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setVisibleReviews(mockReviews.slice(0, visibleReviews.length + 5))}
                                        className="w-full custom-button-neo-dark py-2 text-sm   focus:outline-none">
                                        Load more
                                    </button>
                                </div>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}



export default ReviewsSection;




