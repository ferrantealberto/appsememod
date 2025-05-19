import React from 'react';
import { Download, RefreshCw, Share2 } from 'lucide-react';

interface NutritionPlanDisplayProps {
  plan: string;
  onReset: () => void;
}

const NutritionPlanDisplay: React.FC<NutritionPlanDisplayProps> = ({ plan, onReset }) => {
  const formatPlanContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-xl font-bold mt-6 mb-2 dark:text-white">{line.replace('# ', '')}</h2>;
      }
      
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-lg font-semibold mt-4 mb-1 dark:text-white">{line.replace('## ', '')}</h3>;
      }
      
      if (line.startsWith('### ')) {
        return <h4 key={index} className="text-base font-medium mt-3 mb-1 dark:text-white">{line.replace('### ', '')}</h4>;
      }
      
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-6 list-disc text-gray-700 dark:text-gray-300">
            {line.replace('- ', '')}
          </li>
        );
      }
      
      if (line.match(/^\d+\. /)) {
        return (
          <li key={index} className="ml-6 list-decimal text-gray-700 dark:text-gray-300">
            {line.replace(/^\d+\. /, '')}
          </li>
        );
      }
      
      let formattedLine = line;
      formattedLine = formattedLine.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      
      return <p key={index} className="my-2 text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  const handleDownload = () => {
    const blob = new Blob([plan], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'piano-nutrizionale.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Il Mio Piano Nutrizionale',
          text: plan,
        });
      } catch (error) {
        console.error('Errore nella condivisione:', error);
      }
    } else {
      alert('Condivisione non supportata su questo browser. Puoi scaricare il piano invece.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold dark:text-white">Il Tuo Piano Nutrizionale Personalizzato</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={handleDownload}
            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            <Download size={16} className="mr-1" />
            Scarica
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            <Share2 size={16} className="mr-1" />
            Condividi
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center px-3 py-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg dark:text-emerald-400 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30"
          >
            <RefreshCw size={16} className="mr-1" />
            Nuovo Piano
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-100">
        <div className="prose max-w-none dark:prose-invert">
          {formatPlanContent(plan)}
        </div>
      </div>
    </div>
  );
};

export default NutritionPlanDisplay;