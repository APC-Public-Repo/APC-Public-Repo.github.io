import { FileText, Send, Globe, CheckCircle } from 'lucide-react';

export function SubstackIntegration() {
  return (
    <section className="py-20 bg-[#F0F6FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A5F] mb-4">
            Seamless Publishing Workflow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our researchers publish directly to our Substack account, and papers automatically appear on apcresearch.org
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 mb-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#2D9CDB]/20 hover:border-[#2D9CDB] transition-colors">
                <div className="w-16 h-16 bg-[#2D9CDB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-white" size={32} />
                </div>
                <h3 className="text-center font-bold text-[#1E3A5F] mb-2">
                  1. Write Paper
                </h3>
                <p className="text-center text-gray-600 text-sm">
                  Researcher prepares manuscript
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <div className="w-8 h-0.5 bg-[#2D9CDB]" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-[#2D9CDB] border-t-4 border-t-transparent border-b-4 border-b-transparent" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#2D9CDB]/20 hover:border-[#2D9CDB] transition-colors">
                <div className="w-16 h-16 bg-[#2D9CDB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-white" size={32} />
                </div>
                <h3 className="text-center font-bold text-[#1E3A5F] mb-2">
                  2. Publish on Substack
                </h3>
                <p className="text-center text-gray-600 text-sm">
                  Submit to APC Substack account
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <div className="w-8 h-0.5 bg-[#2D9CDB]" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-[#2D9CDB] border-t-4 border-t-transparent border-b-4 border-b-transparent" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
                <h3 className="text-center font-bold text-[#1E3A5F] mb-2">
                  3. Auto-Sync
                </h3>
                <p className="text-center text-gray-600 text-sm">
                  Webhook integration syncs content
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <div className="w-8 h-0.5 bg-[#D4AF37]" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-[#D4AF37] border-t-4 border-t-transparent border-b-4 border-b-transparent" />
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-green-500/20 hover:border-green-500 transition-colors">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-white" size={32} />
                </div>
                <h3 className="text-center font-bold text-[#1E3A5F] mb-2">
                  4. Live on Website
                </h3>
                <p className="text-center text-gray-600 text-sm">
                  Appears on apcresearch.org
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="https://apcresearch.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D9CDB] text-white rounded-lg hover:bg-[#1E3A5F] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <Globe size={20} />
              Submit via Substack
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
