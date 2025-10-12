<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],

            'cell_number' => ['required', 'string', 'max:25', 'unique:'.User::class, 'phone'],
        ];
    }

    /*
    * Custom error messages for validation
    */ 
    public function messages()
    {
        return [
            'cell_number.phone' => 'Please enter a valid phone number.',
            'cell_number.required' => 'A phone number is required.',
            'cell_number.unique' => 'This phone number is already registered.',
        ];
    }
}
