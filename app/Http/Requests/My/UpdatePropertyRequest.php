<?php

namespace App\Http\Requests\My;

use App\Models\PropertyFeature;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'short_desc' => 'required|string|max:500',
            'description' => 'nullable|string|max:2000',
            'city' => 'required|string|max:100',
            'neighbourhood' => 'required|string|max:100',
            'type' => 'required|string|in:room,house',
            'rent' => 'required|numeric|min:0',
            'deposit' => 'required|numeric|min:0',
            'suitable_for' => 'required|string|max:100',
            'availability_date' => ['required', 'string', function ($attribute, $value, $fail) {
                // Allow "Now" (case-insensitive)
                if (strtolower(trim($value)) === 'now') {
                    return;
                }

                // Validate DD/MM/YYYY format
                if (!preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $value)) {
                    $fail('The availability date must be either "Now" or in DD/MM/YYYY format (e.g., 15/08/2025).');
                    return;
                }

                // Try to parse as date with specific format
                try {
                    $date = \Carbon\Carbon::createFromFormat('d/m/Y', $value)->setTime(0, 0, 0)->setTimezone('UTC');
                    
                    // Check if the parsed date matches the input (catches invalid dates like 32/13/2025)
                    if ($date->format('d/m/Y') !== $value) {
                        $fail('The availability date is not a valid date.');
                        return;
                    }
                    
                    // Check if date is in the future or today
                    if ($date->isPast() && !$date->isToday()) {
                        $fail('The availability date must be today or a future date.');
                    }
                } catch (\Exception $e) {
                    $fail('The availability date must be either "Now" or a valid date in DD/MM/YYYY format.');
                }
            }],
            'rental_status' => 'required|string|in:available,occupied',
            'cell_number' => 'required|string|max:20',
            'whatsapp_number' => 'nullable|string|max:20',
            'features' => 'required|array|max:20',
            'features.*' => [
                'required',
                'string',
                Rule::in(PropertyFeature::pluck('id')->map(fn($id) => (string)$id)->toArray()),
            ],
            'imageIds' => [
                'nullable',
                'array',
            ],
            'newImageIds' => [
                'nullable',
                'array',
                // Custom rule to ensure total images <= 8
                function ($attribute, $value, $fail) {
                    $oldImages = is_array(request('imageIds')) ? count(request('imageIds')) : 0;
                    $newImages = is_array($value) ? count($value) : 0;
                    if (($oldImages + $newImages) > 8) {
                        $fail('You can only provide up to 8 images in total (existing + new).');
                    } elseif (($oldImages + $newImages) < 4) {
                        $fail('You must provide at least 4 images in total (existing + new).');
                    }
                }
            ],
            'newImageIds.*.id' => 'required|string',
            'newImageIds.*.serverId' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $tempFilePath = storage_path('app/private/tmp-files/' . $value);
                    if (!file_exists($tempFilePath)) {
                        $fail('The uploaded image file does not exist or has expired.');
                    }
                }
            ]
        ];
    }

    /**
     * Get the custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'availability_date.required' => 'The availability date is required.',
            'availability_date.string' => 'The availability date must be a string.',
            'imageIds.required' => 'You must upload at least 4 images showcasing your property.',
            'imageIds.min' => 'You must upload 4 to 6 images showcasing your property.',
            'features.required' => 'You must select at least 1 feature.',
            'features.max' => 'You can only provide up to 20 features.',
            'type.required' => 'The property type must be either a "room" or "a full house"',
            'type.in' => 'The property type must be either a "room" or "a full house"'
        ];
    }
}
