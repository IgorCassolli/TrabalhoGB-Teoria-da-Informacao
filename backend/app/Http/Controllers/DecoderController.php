<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DecoderController extends Controller
{
    public function decodeByRepetitionCode(Request $request)
    {
        $wordToDecode = (string) $request->input('string');
        $decodedString = '';
        $decodedRepititionCode = '';
        $i = 0;
        while ($i < strlen($wordToDecode)) {
            $threeBits = substr($wordToDecode, $i, 3);
            $countZeros = substr_count($threeBits, "0");
            if ($countZeros >= 2) {
                $decodedRepititionCode .= "0";
            } else {
                $decodedRepititionCode .= "1";
            }
            $i = $i + 3;
        }

        $bitsByGroup = str_split($decodedRepititionCode, 8);
        foreach ($bitsByGroup as $group) {
            $decimal = bindec($group);
            $decodedString .= chr($decimal);
        }

        return response()->json(['decodedString' => $decodedString]);
    }



    public function decodeByHamming(Request $request)
    {
        $wordToDecode = (string) $request->input('string');
        $binarys = str_split($wordToDecode, 7);
        $decodedString = '';
        $bitsToDecode = '';
        foreach ($binarys as $binary) {
            $error = 0;

            if (($binary[0] ^ $binary[1] ^ $binary[2]) != $binary[4]) {
                $error++;
            }

            if (($binary[1] ^ $binary[2] ^ $binary[3]) != $binary[5]) {
                $error++;
            }

            if (($binary[0] ^ $binary[2] ^ $binary[3]) != $binary[6]) {
                $error++;
            }

            if ($error > 1) {
                $decodedString = "Erro duplo/triplo identificado, não é possível decodificar";
                break;
            }

            $bitsToDecode .= substr($binary, 0, 4);
            if (strlen($bitsToDecode) == 8) {
                $decodedString .= chr(bindec($bitsToDecode));
                $bitsToDecode = '';
            }
        }


        return response()->json(['decodedString' => $decodedString]);
    }
}
