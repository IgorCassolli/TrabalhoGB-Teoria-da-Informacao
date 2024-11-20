<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EncoderController extends Controller
{
    public function encodeByRepetitionCode(Request $request)
    {
        $wordToEncode = (string) $request->input('string');

        $encodedString = '';
        for ($i = 0; $i < strlen($wordToEncode); $i++) {
            $binary = str_pad(decbin(ord($wordToEncode[$i])), 8, '0', STR_PAD_LEFT) . ' ';
            for ($s = 0; $s < strlen($binary); $s++) {
                $encodedString .= trim(str_repeat($binary[$s], 3));
            }
        }

        return response()->json(['encodedString' => $encodedString]);
    }

    function calculateXOR($binary1, $binary2)
    {
        $resultCalculate = '';
        for ($i = 0; $i < strlen($binary1); $i++) {
            $resultCalculate .= (int)$binary1[$i] ^ (int)$binary2[$i];
        }

        return $resultCalculate;
    }

    function getMatrix($binarySequence)
    {

        $resultXOR = null;

        $matrix = array(
            0 => "101",
            1 => "110",
            2 => "111",
            3 => "011"
        );

        foreach (str_split($binarySequence) as $position => $bit) {
            if ($bit == 1) {
                $value = $matrix[$position];
                if ($resultXOR === null) {
                    $resultXOR = $value;
                } else {
                    $resultXOR = $this->calculateXOR($resultXOR, $value);
                }
            }
        }

        if ($resultXOR == null) {
            $resultXOR = "000";
        }

        return (string) $resultXOR;
    }

    public function encodeByHamming(Request $request)
    {
        $wordToEncode = (string) $request->input('string');
        $encodedString = '';
        for ($i = 0; $i < strlen($wordToEncode); $i++) {
            //Transforma cada caractere em binário dividindo os 8 bits de 4 em 4.
            $binarys = str_split(str_pad(decbin(ord($wordToEncode[$i])), 8, '0', STR_PAD_LEFT), 4);
            foreach ($binarys as $binary) {
                $encodedString .= $binary . $this->getMatrix($binary);
            }
        }

        return response()->json(['encodedString' => $encodedString]);
    }
}
