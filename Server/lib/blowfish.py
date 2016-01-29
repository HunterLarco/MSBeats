from random import randrange
from Crypto.Cipher import Blowfish


class BadEncryptionException(Exception):
  pass


class Cipher:
  def __init__(self, pword):
    self.__cipher = Blowfish.new(pword)
  def encrypt(self, file_buffer):
    file_buffer = str(file_buffer)
    ciphertext = self.__cipher.encrypt(self.__pad_file(file_buffer))
    return self.__hexdigest(ciphertext)
  """
  ' ERRORS
  '   exceptions.BadEncryptionException
  """
  def decrypt(self, file_buffer):
    file_buffer = str(file_buffer)
    try:
      file_buffer = self.__unhexdigest(file_buffer)
      cleartext = self.__depad_file(self.__cipher.decrypt(file_buffer))
      return cleartext
    except Exception:
      raise BadEncryptionException()
  # Blowfish cipher needs 8 byte blocks to work with
  def __pad_file(self, file_buffer):
    pad_bytes = 8 - (len(file_buffer) % 8)                                 
    for i in range(pad_bytes - 1): file_buffer += chr(randrange(0, 256))
    # final padding byte; % by 8 to get the number of padding bytes
    bflag = randrange(6, 248); bflag -= bflag % 8 - pad_bytes
    file_buffer += chr(bflag)
    return file_buffer
  def __depad_file(self, file_buffer):
    pad_bytes = ord(file_buffer[-1]) % 8
    if not pad_bytes: pad_bytes = 8
    return file_buffer[:-pad_bytes]
  def __hexdigest(self, string):
    return ''.join(["{:02x}".format(ord(c)) for c in string])
  def __unhexdigest(self, hexdigest):
    return ''.join([chr(int(hexdigest[h:h+2], 16)) for h in xrange(0, len(hexdigest), 2)])