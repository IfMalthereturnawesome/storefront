export default function Timeline() {
  return (
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">

            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h2 className="text-4xl mb-4 custom-header-1">The Journey of Eight Athletics</h2>
              <p className="text-xl text-slate-11">Explore our milestones as we revolutionize sleep quality for athletes around the World</p>
            </div>

            {/* Items */}
            <div className="max-w-3xl mx-auto -my-4 md:-my-6" data-aos-anchor="[data-aos-id-timeline]">

              {/* 1st item */}
              <div className="relative py-4 md:py-6 pl-24" data-aos="fade-up" data-aos-anchor="[data-aos-id-timeline]">
                <div className="pl-2">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">Genesis</div>
                  <div className="flex items-center mb-3">
                    <div className="absolute left-0 inline-flex text-sm font-semibold py-1 px-3 text-green-600 bg-green-200 rounded-full">2021</div>
                    <h4 className="h4 text-slate-12">Eight Athletics Founded</h4>
                  </div>
                  <p className="text-lg text-slate-11">Our journey began with the aim to enhance sleep quality for athletes.</p>
                </div>
              </div>

              {/* 2nd item */}
              <div className="relative py-4 md:py-6 pl-24" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-timeline]">
                <div className="pl-2">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">Innovation</div>
                  <div className="flex items-center mb-3">
                    <div className="absolute left-0 inline-flex text-sm font-semibold py-1 px-3 text-green-600 bg-green-200 rounded-full">2022</div>
                    <h4 className="h4 text-slate-12">High-Fidelity Sleep Mask Prototype</h4>
                  </div>
                  <p className="text-lg text-slate-11">Introduction of our sleep mask prototype designed for athletes.</p>
                </div>
              </div>

              {/* 3rd item */}
              <div className="relative py-4 md:py-6 pl-24" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-timeline]">
                <div className="pl-2">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">Recognition</div>
                  <div className="flex items-center mb-3">
                    <div className="absolute left-0 inline-flex text-sm font-semibold py-1 px-3 text-green-600 bg-green-200 rounded-full">2023 Q2</div>
                    <h4 className="h4 text-slate-12">Positive Feedback & Soft Funding</h4>
                  </div>
                  <p className="text-lg text-slate-11">Received positive feedback and funding, paving the way for product development.</p>
                </div>
              </div>

              {/* 4th item */}
              <div className="relative py-4 md:py-6 pl-24" data-aos="fade-up" data-aos-delay="600" data-aos-anchor="[data-aos-id-timeline]">
                <div className="pl-2">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">Launch</div>
                  <div className="flex items-center mb-3">
                    <div className="absolute left-0 inline-flex text-sm font-semibold py-1 px-3 text-green-600 bg-green-200 rounded-full">2023 Q4</div>
                    <h4 className="h4 text-slate-12">Eight Athletics Sleep Mask Launched</h4>
                  </div>
                  <p className="text-lg text-slate-11">Official market launch of the Eight Athletics sleep mask designed for athletes.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
  )
}
