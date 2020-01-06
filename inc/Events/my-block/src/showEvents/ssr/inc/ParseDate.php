<?php

class ParseDate
{



    function __construct($startDate, $endDate)
    {

        if ('string' !== gettype($startDate)) {
            error_log('startDate needs to be type of String //' . gettype($startDate) . '// was given');
        }
        if ('string' !== gettype($endDate)) {
            error_log('endDate needs to be type of String //' . gettype($startDate) . '// was given');
        }

        $this->sd = strtotime($startDate);
        $this->ed = strtotime($endDate);
    }

    public  function getDate()
    {
        // return $this->ed;
        // no Startdate - retruns TBA
        if (!$this->sd) {
            return 'TBA';
        }
        // no Enddate - retruns startdate
        if (!$this->ed) {
            return date('j.m.y', $this->sd);
        }

        if (date('Y', $this->sd) !== date('Y', $this->ed)) {
            return date('j.m.y', $this->sd) . '-' . date('j.m.y', $this->ed);
        }

        if (date('M', $this->sd) !== date('M', $this->ed)) {

            return date('d.m', $this->sd) . '-' . date('d.m', $this->ed) . ' ' . date('y', $this->ed);
        }
        if (date('d', $this->sd) !== date('d', $this->ed)) {

            return date('j', $this->sd) . '-' . date('j.', $this->ed) . date('m.', $this->sd) .  date('y', $this->ed);
        }

        if (date('d', $this->sd) == date('d', $this->ed)) {

            return date('j.', $this->sd) . date('m.', $this->sd) . date('y', $this->ed);
        }
    }
}
