"use client";

import { Button, Card, CardBody, CardHeader, Divider, Input, Select, SelectItem, SharedSelection } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);

  const [symbolToEncode, setSymbolToEncode] = useState("");
  const [symbolToDecode, setSymbolToDecode] = useState("");

  const [nameEncoder, setNameEncoder] = useState("");
  const [nameDecoder, setNameDecoder] = useState("");

  const [optionChosen, setOptionChosen] = useState("");

  const [response, setResponse] = useState("");

  const algorithms = [
    { key: "Repetition-Code", label: "Código de Repetição R3" },
    { key: "Hamming", label: "Hamming (7,4)" }
  ];

  async function handleEncode() {
    try {
      setIsLoading(true);
      let url = '';
      switch (nameEncoder) {
        case 'Repetition-Code':
          url = 'encode-repetition-code';
          break;
        case 'Hamming':
          url = 'encode-hamming';
          break;
        default:
          break
      }

      setOptionChosen("ENCODE");

      const response = await axios.post(`http://localhost:8000/api/${url}`, {
        "string": symbolToEncode,
        nameEncoder,
      });

      const encodedString = response.data.encodedString;
      setResponse(encodedString);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }

  }

  async function handleDecode() {
    try {
      setIsLoading(true);
      let url = '';
      switch (nameDecoder) {
        case 'Repetition-Code':
          url = 'decode-repetition-code';
          break;
        case 'Hamming':
          url = 'decode-hamming';
          break;
        default:
          break
      }

      setOptionChosen("DECODE")

      const response = await axios.post(`http://localhost:8000/api/${url}`, {
        "string": symbolToDecode,
        nameDecoder,
      });

      const decodedString = response.data.decodedString;
      setResponse(decodedString);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

  }
  function handleEncoderChange(keys: SharedSelection) {
    const selectedValue = Array.from(keys)[0] as string;
    setNameEncoder(selectedValue);
  }

  function handleDecoderChange(keys: SharedSelection) {
    const selectedValue = Array.from(keys)[0] as string;
    setNameDecoder(selectedValue);
  }

  return (
    <main className="min-h-screen w-full px-8 py-4 flex flex-col">
      <div className="flex justify-between items-center gap-8">
        <Card className="w-full">
          <CardHeader className={`flex gap-2 ${optionChosen === 'ENCODE' ? 'bg-green-500' : 'bg-gray-200'}`}>
            <div className="flex flex-col text-center">
              <p className="text-md">Codificação</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Preencha os dados abaixo para <b>codificar.</b></p>
            <div className="flex flex-col gap-3">
              <Input
                label="Input de Símbolos"
                labelPlacement="inside"
                variant="bordered"
                onValueChange={setSymbolToEncode}
              />
              <Select
                label="Algoritmo"
                labelPlacement="inside"
                variant="bordered"
                selectedKeys={new Set([nameEncoder])}
                onSelectionChange={handleEncoderChange}
              >
                {algorithms.map((algorithm) => (
                  <SelectItem key={algorithm.key} value={algorithm.key}>
                    {algorithm.label}
                  </SelectItem>
                ))}
              </Select>
              <Button color="primary" onClick={handleEncode} isLoading={isLoading}>
                Codificar
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardHeader className={`flex gap-2 ${optionChosen === 'DECODE' ? 'bg-green-500' : 'bg-gray-200'}`}>
            <div className="flex flex-col text-center">
              <p className="text-md">Decodificação</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Preencha os dados abaixo para <b>decodificar.</b></p>
            <div className="flex flex-col gap-3">
              <Input
                label="Input de Símbolos"
                labelPlacement="inside"
                variant="bordered"
                onValueChange={setSymbolToDecode}
              />
              <Select
                label="Algoritmo"
                labelPlacement="inside"
                variant="bordered"
                selectedKeys={new Set([nameDecoder])}
                onSelectionChange={handleDecoderChange}
              >
                {algorithms.map((algorithm) => (
                  <SelectItem key={algorithm.key} value={algorithm.key}>
                    {algorithm.label}
                  </SelectItem>
                ))}
              </Select>
              <Button color="primary" onClick={handleDecode} isLoading={isLoading}>
                Decodificar
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <p className="text-xl max-w-[90%] break-words">
          {String(response)}
        </p>
      </div>
    </main>

  );
}
