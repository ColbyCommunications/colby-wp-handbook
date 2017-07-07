<?php

foreach ( glob( __DIR__ . '/hooks/*.php' ) as $file ) {
	require_once( $file );
}
