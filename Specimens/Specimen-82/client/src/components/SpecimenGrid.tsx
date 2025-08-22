import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { type Specimen } from "@shared/schema";

export default function SpecimenGrid() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);

  const { data: specimens } = useQuery({
    queryKey: ["/api/specimens"]
  });

  const handleSelectSpecimen = (specimen: Specimen) => {
    setSelectedSpecimen(specimen);
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-mystic-amber/30 mb-8">
      <h3 className="text-2xl font-mystical text-mystic-gold mb-6 text-center">
        <code>Specimen Collection Database</code>
      </h3>
      
      {selectedSpecimen && (
        <div className="mb-6 p-4 bg-forest-dark/30 rounded-lg border border-forest-light/20">
          <h4 className="text-lg font-mystical text-mystic-gold mb-3">
            <code>Selected: Specimen({selectedSpecimen.specimenNumber})</code>
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="mb-2">
                <span className="text-cream"><code>Type:</code></span>
                <span className="text-forest-light ml-2">{selectedSpecimen.specimenType}</span>
              </div>
              <div className="mb-2">
                <span className="text-cream"><code>Status:</code></span>
                <span className={`ml-2 ${selectedSpecimen.status === 'active' ? 'text-forest-med' : 'text-cream/60'}`}>
                  {selectedSpecimen.status}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-cream"><code>Classification:</code></span>
                <span className="text-digital-light ml-2">{selectedSpecimen.classification}</span>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <span className="text-cream"><code>Discovery Date:</code></span>
                <span className="text-cream/80 ml-2">
                  {new Date(selectedSpecimen.discoveryDate).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-cream"><code>Rarity:</code></span>
                <span className={`ml-2 ${
                  selectedSpecimen.metadata?.rarity === 'legendary' ? 'text-mystic-gold' :
                  selectedSpecimen.metadata?.rarity === 'rare' ? 'text-digital-light' : 'text-cream/80'
                }`}>
                  {selectedSpecimen.metadata?.rarity || 'unknown'}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-cream"><code>Digital Signature:</code></span>
                <span className="text-mystic-amber ml-2 font-mono text-xs">
                  {selectedSpecimen.metadata?.digitalSignature || 'N/A'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedSpecimen(null)}
            className="mt-3 text-xs text-cream/60 hover:text-cream transition-colors"
            data-testid="close-specimen-details"
          >
            <code>[Close Details]</code>
          </button>
        </div>
      )}

      <div className="specimen-grid mb-4">
        {specimens?.map((specimen) => (
          <div
            key={specimen.id}
            onClick={() => handleSelectSpecimen(specimen)}
            className={`bg-forest-dark/30 border rounded p-2 text-center text-xs cursor-pointer transition-all hover:scale-105 ${
              specimen.status === 'active' 
                ? 'border-forest-light/50 hover:bg-forest-med/50' 
                : specimen.metadata?.rarity === 'legendary'
                  ? 'border-mystic-gold/30 hover:bg-mystic-gold/20'
                  : specimen.metadata?.rarity === 'rare'
                    ? 'border-digital-light/30 hover:bg-digital-light/20'
                    : 'border-forest-light/20 hover:bg-forest-med/30'
            }`}
            data-testid={`specimen-${specimen.specimenNumber}`}
          >
            <code>Specimen({specimen.specimenNumber})</code>
            {specimen.status === 'active' && (
              <div className="text-forest-med text-xs mt-1">●</div>
            )}
            {specimen.metadata?.rarity === 'legendary' && (
              <div className="text-mystic-gold text-xs mt-1">★</div>
            )}
            {specimen.metadata?.rarity === 'rare' && (
              <div className="text-digital-light text-xs mt-1">◆</div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center text-forest-light">
        <code>Digital Clothing Louse</code> - <code>Active Specimen: DCL_001</code>
      </div>
      
      <div className="text-center text-xs text-cream/60 mt-2">
        <code>Collection Size: {specimens?.length || 0} specimens</code> | 
        <code>Active: {specimens?.filter(s => s.status === 'active').length || 0}</code> | 
        <code>Legendary: {specimens?.filter(s => s.metadata?.rarity === 'legendary').length || 0}</code>
      </div>
    </div>
  );
}
