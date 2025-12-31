"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Download, X, Loader2 } from 'lucide-react';

interface Props {
  pdfName: string;
  pdfUrl: string;
  coverImage: string;
}

export default function CatalogueDownloader({ pdfName, pdfUrl, coverImage }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, catalogueName: pdfName }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit details.');
      }

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', `${pdfName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsLoading(false);
      setIsOpen(false);
      setName("");
      setPhone("");

    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "An unknown error occurred.");
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="relative rounded-lg overflow-hidden border-2 border-accent/30 h-80 
                   flex items-end p-6 cursor-pointer group"
      >
        <Image src={coverImage} alt={pdfName} fill className="object-cover -z-10 
                                                                       transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent -z-10" />
        <h3 className="font-heading text-2xl text-white mr-12">{pdfName}</h3>
        <div className="absolute top-6 right-6 p-3 bg-accent/80 rounded-full
                        transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
          <Download size={24} className="text-background" />
        </div>
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000] flex items-center justify-center p-4">
          <div className="relative bg-background-alt w-full max-w-lg rounded-xl shadow-2xl border border-white/20 p-8">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 text-text-light hover:text-accent"
            >
              <X size={28} />
            </button>
            
            <h3 className="font-heading text-2xl text-accent mb-2">Download:</h3>
            <p className="text-lg text-text mb-6">{pdfName}</p>
            <p className="text-text-light mb-6">
              Please enter your details to start the download.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-light mb-1">Full Name</label>
                <input 
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-white/20 rounded-md p-3 text-text"
                  placeholder="Manav Gangar"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-light mb-1">Phone Number</label>
                <input 
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-background border border-white/20 rounded-md p-3 text-text"
                  placeholder="+91 99999 99999"
                />
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <>
                    <Download size={20} />
                    Download Now
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}