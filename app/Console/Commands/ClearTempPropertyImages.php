<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Carbon;

class ClearTempPropertyImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-temp-property-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete temporary uploaded property images';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $disk = Storage::disk('r2');
        $path = 'public/tmp-files/property-images';

        // Get all folders in tmp path
        $directories = $disk->directories($path);

        foreach ($directories as $dir) {
            // Extract timestamp from folder name
            $parts = explode('-', basename($dir));
            $timestamp = end($parts);

            if (is_numeric($timestamp)) {
                $folderTime = Carbon::createFromTimestamp($timestamp);

                if ($folderTime->lt(now()->subHour())) {
                    $this->info("Deleting: $dir");
                    $disk->deleteDirectory($dir);
                }
            }
        }

        return 0;
    }
}
