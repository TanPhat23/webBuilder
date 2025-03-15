"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";

const Features = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-20">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-24"
          >
            Our Features
          </m.h2>

          <div className="flex flex-col gap-16 md:gap-24">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <m.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full md:w-2/3 h-64 bg-gray-100 rounded-xl"
              />
              <m.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-full md:w-1/3"
              >
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">Build like PowerPoint</h3>
                <p className="text-gray-600 md:text-lg">
                  You just need to drag and drop to create a simple website.
                </p>
              </m.div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <m.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-full md:w-1/3 order-2 md:order-1"
              >
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">Export to JavaScript</h3>
                <p className="text-gray-600 md:text-lg">
                  Export to JavaScript files for easy integration.
                </p>
              </m.div>
              <m.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-full md:w-2/3 h-64 bg-gray-100 rounded-xl order-1 md:order-2"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <m.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-full md:w-2/3 h-64 bg-gray-100 rounded-xl"
              />
              <m.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-full md:w-1/3"
              >
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">Free to use</h3>
                <p className="text-gray-600 md:text-lg">
                  Free basic features with optional premium upgrades.
                </p>
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Features;