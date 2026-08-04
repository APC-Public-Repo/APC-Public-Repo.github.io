import { ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

export function FAQSection() {
  const faqs = [
    {
      question: 'How can I join the APC Research group?',
      answer: 'We welcome researchers, graduate students, and collaborators passionate about nanotechnology. Please contact us through our email at apc@nano.id with your CV and research interests. We typically recruit during academic semesters and for specific project openings.',
    },
    {
      question: 'Can I do my thesis research at APC?',
      answer: 'Yes! We actively collaborate with universities and supervise graduate thesis research. Both Master\'s and PhD students can conduct research under our guidance. Contact our team leads to discuss potential thesis topics aligned with our research subteams.',
    },
    {
      question: 'What are the other research teams at Nano Center Indonesia?',
      answer: 'Nano Center Indonesia houses multiple specialized research groups beyond APC, including teams focused on nanomedicine, energy storage, catalysis, and advanced materials characterization. Visit the main NCI website for a complete list of research divisions.',
    },
    {
      question: 'How can I access your published papers?',
      answer: 'All our publications are available through our Publications page, ResearchGate profile, and our Substack account. Most papers are open-access, and we encourage knowledge sharing within the scientific community.',
    },
    {
      question: 'Do you offer partnership opportunities for industry collaboration?',
      answer: 'Absolutely! We actively seek partnerships with industry for applied research, technology transfer, and commercialization. Contact us to discuss collaboration opportunities, joint projects, or technology licensing.',
    },
    {
      question: 'What facilities and equipment are available at APC?',
      answer: 'We have state-of-the-art facilities including electron microscopes, electrospinning systems, clean rooms, and advanced characterization tools. Our equipment supports research from material synthesis to device fabrication and testing.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about APC Research
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="bg-white border border-[#2D9CDB]/20 rounded-lg overflow-hidden hover:border-[#2D9CDB] transition-colors"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex items-center justify-between w-full p-6 text-left hover:bg-[#F0F6FF] transition-colors">
                  <span className="font-bold text-[#1E3A5F] text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="text-[#2D9CDB] transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0"
                    size={24}
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
