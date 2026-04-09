import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from 'react';

function QuizCard({ quiz, index}) {
    const [answered, setAnswered] = useState(false);
    const [selected, setSelected] = useState(null); // option selected
    const correctOptionIdx = quiz.correctIndex;
    const correct = selected === correctOptionIdx; 

    const handleButtonClick = (idx) => {
        setAnswered(true);
        setSelected(idx);
        console.log(idx == correctOptionIdx);
    }
    return (  
        <div className="rounded-lg border border-border bg-card p-4">
            {/* the question */}
            <p className="mb-3 text-sm font-semibold text-card-foreground"> 
                Q{index + 1}: {quiz.question}
            </p>

            {/* The question options */}
            <div className='space-y-2'> 
                {quiz.options.map((opt, idx) => {

                    return (
                        <Button 
                        key={idx}
                        variant="outline"
                        disabled={answered}
                        onClick = {() => handleButtonClick(idx)}
                        className="w-full justify-start text-left text-sm"
                        aria-label={`Option: ${opt}`}
                        > 
                        {opt} 
                        </Button>
                    );
                })}
            </div>

            {/* Feedback sectio */}
            {/* if answered */}
            { answered && (
                <div className={`mt-3 flex items-center gap-2 text-sm ${correct ? "text-primary" : "text-destructive"}`}>
                {correct ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {correct ? "Correct!" : `Incorrect. The answer is: ${quiz.options[quiz.correctIndex]}`}
                </div>
            )}
            
        </div>
    );
}

export default QuizCard;