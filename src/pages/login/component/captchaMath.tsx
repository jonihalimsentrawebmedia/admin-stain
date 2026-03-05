import {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button.tsx";

interface Props {
  setSameAction: (value: boolean) => void;
}

export default function CaptchaMath({setSameAction}: Props) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    generateNumbers();
  }, []);

  useEffect(() => {

    if (Number(answer) === total) {
      setSameAction(true);
    } else {
      setSameAction(false);
    }
  }, [answer, total, setSameAction]);

  const generateNumbers = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setNum1(a);
    setNum2(b);
    setTotal(a * b);
    setAnswer('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Hasil dari {num1} * {num2} {' '}
        <Button
          size={'sm'}
          onClick={(e) => {
            e.preventDefault();
            generateNumbers();
          }}
          variant={'ghost'}
          className={'text-primary hover:text-primary w-fit'}>
          (Ganti Soal)
        </Button>
        <Input
          value={answer}
          type="number"
          min={0}
          placeholder="Masukkan hasil"
          className="rounded appearance-none focus:outline-none focus-visible:ring-0 active:outline-none mt-1 mb-4"
          onChange={(e) => setAnswer(e.target.value)}
        />
      </label>
    </div>
  );
}