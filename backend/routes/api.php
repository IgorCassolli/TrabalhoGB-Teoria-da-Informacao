<?php

use App\Http\Controllers\DecoderController;
use App\Http\Controllers\EncoderController;
use Illuminate\Support\Facades\Route;

Route::post('/encode-repetition-code', [EncoderController::class, 'encodeByRepetitionCode']);
Route::post('/encode-hamming', [EncoderController::class, 'encodeByHamming']);

Route::post('/decode-repetition-code', [DecoderController::class, 'decodeByRepetitionCode']);
Route::post('/decode-hamming', [DecoderController::class, 'decodeByHamming']);
