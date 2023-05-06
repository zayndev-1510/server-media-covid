<?php

namespace App\Mail;

use App\Models\api\tokenModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Http\Request;

class emailMarkdown extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(Request $res)
    {
        $data=substr(str_shuffle("0123456789"), 0, 6);
        $t=new tokenModel();
        $t->token=$data;
        $t->email=$res->email;
        $t->waktu=date("Y-m-d H:i:s");
        $t->save();
        return $this->markdown('emails.markdown',compact('data'));
    }
}
