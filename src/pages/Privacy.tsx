import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { ScrollArea } from '../components/ui/scroll-area';
import { Button } from '../components/ui/button';

export default function PrivacyPolicy() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Terms, Privacy, and Policies
          </h1>
          <p className="mt-4 text-blue-100 text-center max-w-2xl mx-auto">
            Important information about your use of our services, your privacy,
            and our policies.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-100"
            onClick={() => window.history.back()}
          >
            ← Back to Home
          </Button>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <ScrollArea className="h-[600px] p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="terms">
                <AccordionTrigger className="text-2xl font-semibold text-blue-800">
                  Terms & Conditions
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      This document is an electronic record in terms of
                      Information Technology Act, 2000 and rules there under as
                      applicable and the amended provisions pertaining to
                      electronic records in various statutes as amended by the
                      Information Technology Act, 2000. This electronic record
                      is generated by a computer system and does not require any
                      physical or digital signatures.
                    </p>
                    <p>
                      This document is published in accordance with the
                      provisions of Rule 3 (1) of the Information Technology
                      (Intermediaries guidelines) Rules, 2011 that require
                      publishing the rules and regulations, privacy policy and
                      Terms of Use for access or usage of domain name
                      https://www.getsweven.com/ ('Website'), including the
                      related mobile site and mobile application (hereinafter
                      referred to as 'Platform').
                    </p>
                    <p>
                      The Platform is owned by LEMONADE DIGITAL MEDIA, a company
                      incorporated under the Companies Act, 1956 with its
                      registered office at B-279 13-A, GALI NO 10, New Delhi
                      Ashok Nagar Mandoli ,New Delhi ,India (hereinafter
                      referred to as 'Platform Owner', 'we', 'us', 'our').
                    </p>
                    {/* Add more paragraphs here */}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy">
                <AccordionTrigger className="text-2xl font-semibold text-blue-800">
                  Privacy Policy
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-xl font-semibold text-blue-700">
                      Introduction
                    </h3>
                    <p>
                      This Privacy Policy describes how LEMONADE DIGITAL MED and
                      its affiliates (collectively "LEMONADE DIGITAL MED, we,
                      our, us") collect, use, share, protect or otherwise
                      process your information/ personal data through our
                      website https://www.getsweven.com/ (hereinafter referred
                      to as Platform).
                    </p>

                    <h3 className="text-xl font-semibold text-blue-700">
                      Collection
                    </h3>
                    <p>
                      We collect your personal data when you use our Platform,
                      services or otherwise interact with us during the course
                      of our relationship and related information provided from
                      time to time. Some of the information that we may collect
                      includes but is not limited to personal data / information
                      provided to us during sign-up/registering or using our
                      Platform such as name, date of birth, address,
                      telephone/mobile number, email ID and/or any such
                      information shared as proof of identity or address.
                    </p>

                    <h3 className="text-xl font-semibold text-blue-700">
                      Usage
                    </h3>
                    <p>
                      We use personal data to provide the services you request.
                      To the extent we use your personal data to market to you,
                      we will provide you the ability to opt-out of such uses.
                      We use your personal data to assist sellers and business
                      partners in handling and fulfilling orders; enhancing
                      customer experience; to resolve disputes; troubleshoot
                      problems; inform you about online and offline offers,
                      products, services, and updates; customise your
                      experience; detect and protect us against error, fraud and
                      other criminal activity; enforce our terms and conditions;
                      conduct marketing research, analysis and surveys; and as
                      otherwise described to you at the time of collection of
                      information.
                    </p>

                    {/* Add more sections here */}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="refund">
                <AccordionTrigger className="text-2xl font-semibold text-blue-800">
                  Refund and Cancellation Policy
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Once the refund request is approved,The Refunded Amount
                      will be processed and credited within 7 Days to the
                      original mode of payment.
                    </p>

                    <p>
                      In case of any refunds approved by LEMONADE DIGITAL MED,
                      it will take 7 days for the refund to be processed to you.
                    </p>
                    <p>Minimum order value will be INR500</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 LEMONADE DIGITAL MED. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
